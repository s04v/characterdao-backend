const AccountService = require('../services/account');
const {UserSchema} = require('../middlewares/validators');
const stmp = require("../services/smtp");
const randtoken = require('rand-token');

const signIn = (req, res) => {
    const valid = UserSchema.validate(req.body);
    if(valid.hasOwnProperty('error'))
        return res.status(400).send(valid.error.message);

    AccountService.signIn(req.body.Email, req.body.Password).then(result => {
        if(!result.success)
            return res.status(400).send(result.error);

        res.status(200).send(result.body);
    });
}

const signUp = async (req, res) => {
    const valid =  UserSchema.validate(req.body);
    if(valid.hasOwnProperty('error'))
        return res.status(400).send(valid.error.message);

    AccountService.signUp(req.body.Email, req.body.Password).then(result => {
        console.log(result)
        if(!result.success)
            return res.status(400).send(result.error);

        res.status(200).send(result.body);
    });
}

const verify = (req, res) => {
    const token = req.params.token;

    AccountService.verify(token).then(result => {
        if(result)
            return res.sendStatus(200);

        return res.sendStatus(404);
    });
}

module.exports = {
    signIn,
    signUp,
    verify
}