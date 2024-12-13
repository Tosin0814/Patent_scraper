const pageData = require('../../helpers/pageData')


function create(req, res, next) {
    // pageData.pageData(req.body.patentId)
    // .then((data)=> {
    //     // console.log('data:', data)
    //     res.json(data)
    // })
    // .catch((err)=> {
    //     console.log(err);
    //     res.status(500).send('An error occurred', err);
    // })
    console.log('hit')
    console.log(req.body)
    res.json(req.body)
}

module.exports = {
create
}