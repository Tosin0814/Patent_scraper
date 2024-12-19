const pageData = require('../../helpers/pageData')
const PatentData = require('../../models/patentData')


async function create(req, res, next) {
    try {
        const allPatents = await PatentData.find({})
        const allPatentDocumentNumbers = allPatents.map(patent => patent.documentNumber)
        const data = await pageData.pageData(req.body.patentId)
        if (allPatentDocumentNumbers.includes(data.documentNumber)) {
            // return res.status(400).json('Patent already exists in the database')
            const patent = await PatentData.findOne({documentNumber: data.documentNumber})
            patent.classifications = req.body.classifications
            await patent.save()
            res.status(200).json(patent)
        } else {
            const patent = await PatentData.create(data)
            res.status(200).json(patent)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
create
}