const {DataTypes} = require('sequelize');

const User = require('./user.model');
const db = require('../services/db');

const Character = db.define('Character', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Name: {
       type: DataTypes.STRING(50),
       allowNull: false
    },
    NFTLink: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    SocialLink: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MainPhoto:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    Photo1:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    Photo2:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    Photo3:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    IsPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
});

User.hasMany(Character);
Character.belongsTo(User);

Character.sync();

module.exports = Character;