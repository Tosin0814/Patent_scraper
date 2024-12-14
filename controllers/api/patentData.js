const pageData = require('../../helpers/pageData')
const PatentData = require('../../models/patentData')


async function create(req, res, next) {
    try {
        const allPatents = await PatentData.find({})
        const allPatentDocumentNumbers = allPatents.map(patent => patent.documentNumber)
        if (allPatentDocumentNumbers.includes(req.body.patentId)) {
            return res.status(400).json('Patent already exists in the database')
        }
        const data = await pageData.pageData(req.body.patentId)
        const patent = await PatentData.create(data)
        res.status(200).json(patent)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
create
}