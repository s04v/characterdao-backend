require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express()

const AccountController = require('./controllers/account');
const CharacterController = require('./controllers/character');

const UserModel = require('./models/user.model');
const CharacterModel = require('./models/character.model');

const db = require('./services/db');
const hasher = require('./utils/hasher');
const {UserSchema} = require("./middlewares/validators");
const CheckAuth = require('./middlewares/authentication');

var corsOptions = {
  origin: "https://character-dao-frontend.herokuapp.com",
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded());
app.use(express.json());

app.post('/api/account/signin', AccountController.signIn);
app.post('/api/account/signup', AccountController.signUp);
app.get('/api/account/verify/:token', AccountController.verify);
app.post('/api/character',CheckAuth, CharacterController.create);
app.get('/api/characters', CharacterController.getAll);
app.get('/api/characters/private',CheckAuth, CharacterController.getAllPrivate);
app.get('/api/character/:id', CharacterController.get);
app.put('/api/character/:id',CheckAuth, CharacterController.update);
app.delete('/api/character/:id',CheckAuth, CharacterController.remove);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
