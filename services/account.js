const jwt = require('jsonwebtoken');
const hasher = require('../utils/hasher');
const UserModel = require('../models/user.model');

const signUp = async (email, password) => {
    const user = await UserModel.findOne({ where: { Email: email}});
    if(user !== null)
        return {success: false, error: "User with this email already exists"};

    const hash = await hasher.make(password);
    const result = await UserModel.create({Email: email, Password: hash});

    const token = jwt.sign({ id: result.Id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });

    return {success: true, body: {result, jwt: token}};
}

const signIn = async (email, password) => {
    const user = await UserModel.findOne({ where: { Email: email}});

    if(user === null)
        return {success: false, error: "Invalid email or password"};

    if(!(await hasher.compare(password, user.Password)))
        return {success: false, error: "Invalid email or password"};

    const token = jwt.sign({ id: user.Id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });

    return {success: true, body: {user, jwt: token}};
}

module.exports = {signUp, signIn};
