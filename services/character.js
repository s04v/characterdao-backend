const jwt = require('jsonwebtoken');
const CharacterModel = require('../models/character.model');
const { Op } = require("sequelize");

const getAll = async () => {
    const result = await CharacterModel.findAll({where: {IsPublic: 1}});

    return result;
}

const getAllPrivate = async (id) => {
    const result = await CharacterModel.findAll({where: {UserId: id}});

    return result;
}

const create = async (data) => {
    const result = await CharacterModel.create(data);

    return result;
}

const get = async (id, userId) => {
    const result = await CharacterModel.findOne({where: {Id: id}});
    if(result) {
        if(result.IsPublic || result.UserId === userId)
            return result;
    }

    return null;
}

const update = async (data, id, userId) => {
    const result = await CharacterModel.findOne({where: {[Op.and]: [{Id: id}, {UserId: userId}]}});
    if(result) {
        result.set({...data});
        result.save();
    }

    return result;
}

const remove = async (id, userId) => {
    const result = await CharacterModel.destroy({where: {Id: id, UserId: userId}});

    return result;
}

module.exports = {
    getAll,
    getAllPrivate,
    create,
    get,
    update,
    remove
}