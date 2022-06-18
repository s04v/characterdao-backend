const AccountService = require('../services/account');
const {UserSchema} = require('../middlewares/validators');

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

const signUp = (req, res) => {
    const valid =  UserSchema.validate(req.body);
    if(valid.hasOwnProperty('error'))
        return res.status(400).send(valid.error.message);

    AccountService.signUp(req.body.Email, req.body.Password).then(result => {
        if(!result.success)
            return res.status(400).send(result.error);

        res.status(200).send(result.body);
    });
}

module.exports = {
    signIn,
    signUp
}