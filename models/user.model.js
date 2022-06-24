const {DataTypes} = require("sequelize");

const db = require("../services/db");

const User = db.define('User', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    Verified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    VerifyToken: {
        type: DataTypes.STRING(32),
        allowNull: true
    }

},{
    timestamps: false
});

User.sync();

module.exports = User;