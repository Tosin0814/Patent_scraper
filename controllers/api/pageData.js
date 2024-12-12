const pageData = require('../../helpers/pageData')


// function index (req, res, next) {
//     res.render('index', { 
//         title: 'Google Patent Scraper',
//     })
// }

function create(req, res, next) {
    pageData.pageData(req.body.patentId)
    .then((data)=> {
        // console.log('data:', data)
        res.json(data)
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).send('An error occurred', err);
    })
}

module.exports = {
// index,
create
}