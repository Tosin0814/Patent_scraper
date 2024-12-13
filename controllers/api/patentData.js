const pageData = require('../../helpers/pageData')
const PatentData = require('../../models/patentData')


async function create(req, res, next) {
    try {
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