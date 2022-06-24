const jwt = require('jsonwebtoken');
const hasher = require('../utils/hasher');
const UserModel = require('../models/user.model');
const stmp = require("../services/smtp");
const randtoken = require('rand-token');

const signUp = async (email, password) => {
    const user = await UserModel.findOne({ where: { Email: email}});
    if(user !== null)
        return {success: false, error: "User with this email already exists"};


    const verifyToken = randtoken.generate(32);
    const mailOptions = {
        from: 'bitalikk04@gmail.com',
        to: email,
        subject: 'Email verification',
        html: `
            <p>Hi,<br />
                We just need to verify your email address<br /> <br />
                
                Verify your email address <a href='http://localhost:3000/verify/${verifyToken}'>link</a> <br />
                
            Thanks!</p>`
    };

    const emailResult = stmp.send(mailOptions).then((res) => console.log(res)).catch((error) => console.error(error));

    const hash = await hasher.make(password);
    const result = await UserModel.create({Email: email, Password: hash, Verified: false, VerifyToken: verifyToken});

    return {success: true};
}

const signIn = async (email, password) => {
    const user = await UserModel.findOne({ where: { Email: email}});

    if(user === null)
        return {success: false, error: "Invalid email or password"};

    if(!(await hasher.compare(password, user.Password)))
        return {success: false, error: "Invalid email or password"};

    if(!user.Verified)
        return {success: false, error: "Account not verified"};

    const token = jwt.sign({ id: user.Id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });

    return {success: true, body: {user, jwt: token}};
}

const verify = async (token) => {
    const user = await UserModel.findOne({ where: { VerifyToken: token}});

    if(!user)
        return null;

    user.set({ Verified: true, VerifyToken: null });
    user.save();

    return user;
}

module.exports = {
    signUp,
    signIn,
    verify
};
