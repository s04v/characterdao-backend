const jwt = require('jsonwebtoken');
const {CharacterSchema} = require('../middlewares/validators');
const CharacterService = require('../services/character');

const getAll = (req, res) => {
    CharacterService.getAll().then(result => {
        if(result.length != 0)
            return res.status(200).send(result);

        return res.sendStatus(404);
    });
}

const getAllPrivate = (req, res) => {
    CharacterService.getAllPrivate(req.userId).then(result => {
        if(result.length != 0)
            return res.status(200).send(result);

        return res.sendStatus(404);
    })

}

const create = (req, res) => {
    const valid = CharacterSchema.validate(req.body);
    if(valid.hasOwnProperty('error'))
        return res.status(400).send(valid.error.message);

    CharacterService.create({...req.body, UserId: req.userId}).then(result => {
        return res.status(200).send(result);
    });
}

const get = (req, res) => {
    CharacterService.get(req.params.id, req.userId).then(result => {
        if(result)
            return res.status(200).send(result);

        return res.sendStatus(404);
    })
}

const update = (req, res) => {
    const valid = CharacterSchema.validate(req.body);
    if(valid.hasOwnProperty('error'))
        return res.status(400).send(valid.error.message);

    CharacterService.update(req.body, req.params.id, req.userId).then(result => {
        if(result)
            return res.status(200).send(result);

        return res.sendStatus(404);
    });
}

const remove = (req, res) => {
    CharacterService.remove(req.params.id, req.userId).then(result => {
        if(result)
            return res.sendStatus(200);

        return res.sendStatus(404);
    });
}

module.exports = {
    getAll,
    getAllPrivate,
    create,
    get,
    update,
    remove
}