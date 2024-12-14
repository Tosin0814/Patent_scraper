const User = require('../../models/user');
const { createJWT, isValidPassword } = require('../../helpers/auth')

async function create (req, res, next){
    try{
        const user = await User.create(req.body);
        const token = createJWT(user)
        res.json(token)
    }catch(err){
        res.status(400).json(err);
    }
}

async function login(req, res, next) {
    try {
        const pw = req.body.password;
        const email = req.body.email;

        const user = await User.findOne({email})
        const match = await isValidPassword(pw, user.password)

        if(user._id && match){
            const token = createJWT(user)
            res.json(token)
        }else{
            res.status(400).json("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).json("Invalid Credentials");
    }
}

function checkToken(req, res, next) {
    res.json(req.exp)
}


module.exports = {
    create,
    login,
    checkToken
}
