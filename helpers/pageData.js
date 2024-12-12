require('dotenv').config();

const fetch = require("node-fetch");
const cheerio = require('cheerio');

// const puppeteer = require('puppeteer');

// Use puppeteer-extra instead of require('puppeteer')
const puppeteer = require('puppeteer-extra');
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

// const reg = /\s{2,}/g
const reg = /.{2,}\s{2,}/g

const removeOriginalLanguageRegex = /<span class="google-src-text">[\s\S]*?<\/span>/g;

// function to get the raw data
const getRawPatentData = async (URL) => {
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            // console.log(cheerio.load(data).html())
            return cheerio.load(data)
        })
        .then((data) => {
            return data;
        });
};

const getNonPatentData = async (url) => {
    console.log("Opening the browser......");
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080',
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
        ],
        'ignoreHTTPSErrors': true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    console.log("Waiting for the page to load......");
    await page.waitForSelector('body');
    console.log("Page loaded successfully......");

    const npd = await page.evaluate(() => {
        const data = document.querySelector('body').innerHTML;
        return data;
    }
    );
    console.log("Closing the browser......");
    await browser.close();
    return npd;
}

// start of the program
const pageData = async (userInput) => {
    // userInput = userInput.replaceAll(' ', '')
    // URL for data
    userInput = userInput.toUpperCase().replaceAll(' ', '')
        // This conditional block is to handle US patent numbers that are missing a zero after the first four digits
        if (userInput.startsWith('US')) {
            const numbers = userInput.match(/\d+/g)
            if (numbers[0] && numbers[0].length === 10) {
                const numbersArray = numbers[0].split('')
                numbersArray.splice(4, 0, '0')
                userInput = userInput.replace(/\d{3,}/g, numbersArray.join(''))
            }
        }
        const URL = `https://patents.google.com/patent/${userInput}/en?oq=${userInput}`;
        // const URL = `https://patents.google.com/patent/${userInput}`;
        
        // Parsing the data
        const rawPageData = await getRawPatentData(URL);
        const cleanedPageData = rawPageData.html().replaceAll(removeOriginalLanguageRegex, '');
        const parsedPageData = cheerio.load(cleanedPageData);


        // TITLE
        const title = parsedPageData("[name='DC.title']").attr('content')


        // Patent PDF File
        const patentPDF = parsedPageData("[name='citation_pdf_url']").attr('content')

    
        // APPLICATION NUMBER
        const applicationNumber = parsedPageData("[name='citation_patent_application_number']").attr('content')
        

        // DATE SUBMITTED
        const dateSubmitted = parsedPageData("meta[scheme='dateSubmitted'][name='DC.date']").attr('content')
        

        // PUBLICATION NUMBER
        let publicationNumber = ''
        const rawTitle = parsedPageData("title").text()
        const rawTitleMatch = [...rawTitle.matchAll(/\s-/g)]
        if (rawTitleMatch[0]) {
            publicationNumber = rawTitle.substring(0, rawTitleMatch[0].index)
        }


        // PUBLICATION DATE
        const publicationDate = parsedPageData("meta[name='DC.date']:last").attr('content')

        
        // ISSUE DATE (GRANTED)
        const issueDate = parsedPageData("meta[scheme='issue'][name='DC.date']").attr('content')
        

        // ASSIGNEES
        const rawAssigneeList = parsedPageData("meta[scheme='assignee'][name='DC.contributor']").toArray()
        let processedAssigneeList = []
        rawAssigneeList.forEach(element => {
            if (element.attribs.content != null) {
                processedAssigneeList.push(element.attribs.content)
            }
        });

        
        // INVENTORS
        const rawInventorsList = parsedPageData("meta[scheme='inventor'][name='DC.contributor']").toArray()
        let processedInventorsList = []
        rawInventorsList.forEach(element => {
            if (element.attribs.content != null) {
                processedInventorsList.push(element.attribs.content)
            }
        });

        
        // ABSTRACT
        let abstract
        if (parsedPageData('.abstract').text()) {
            abstract = parsedPageData('.abstract').text()
        } else if (parsedPageData('abstract').text()) {
            abstract = parsedPageData('abstract').text()
        } else {
            abstract = ''
        }
        
        
        // CLAIMS
        let claimsText
        if (parsedPageData('.claims').text()) {
            claimsText = `${parsedPageData('.claims').text()} `
        } else if (parsedPageData('claims').text()) {
            claimsText = `${parsedPageData('claims').text()} `
        } else {
            claimsText = ''
        }
        const matchClaims = [...claimsText.matchAll(reg)]
        const claimsList = () => {
            let claimsArray = []
            for (let idx = 0; idx < matchClaims.length; idx++) {
                let phrase = null
                if (idx < (matchClaims.length-1)) {
                    phrase = claimsText.substring(matchClaims[idx].index, matchClaims[idx+1].index-1)
                } else {
                    phrase = claimsText.substring(matchClaims[idx].index, ((matchClaims[idx].index)+(matchClaims[idx][0].length-1)))
                }
                if (phrase) {
                    claimsArray.push(phrase.replaceAll('\n', ' '))
                }
            }
            return claimsArray
        }

        const claims = claimsList()
        

        // DESCRIPTION
        let descriptionText
        if (parsedPageData('.description').text()) {
            descriptionText = `${parsedPageData('.description').text()} `
        } else if (parsedPageData('description').text()) {
            descriptionText = `${parsedPageData('description').text()} `
        } else {
            descriptionText = ''
        }
        const matchDescription = [...descriptionText.matchAll(reg)]
        const descriptionList = () => {
            let descriptionArray = []
            for (let idx = 0; idx < matchDescription.length; idx++) {
                let phrase = null
                if (idx < (matchDescription.length-1)) {
                    phrase = descriptionText.substring(matchDescription[idx].index, matchDescription[idx+1].index-1)
                } else {
                    phrase = descriptionText.substring(matchDescription[idx].index, ((matchDescription[idx].index)+(matchDescription[idx][0].length-1)))
                }
                if (phrase) {
                    descriptionArray.push(phrase.replaceAll('\n', ' '))
                }
            }
            return descriptionArray
        }

        const description = descriptionList()

        
        return {
            documentNumber: userInput,
            title: title,
            applicationNumber: applicationNumber,
            publicationNumber: publicationNumber,
            dateSubmitted: dateSubmitted,
            publicationDate: publicationDate,
            issueDate: issueDate,
            assigneeList: processedAssigneeList,
            inventorList: processedInventorsList,
            abstract: abstract,
            claims: claims,
            description: description,
        }
};

module.exports = {
    pageData,
}