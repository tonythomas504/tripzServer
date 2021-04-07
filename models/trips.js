const { DataTypes } = require('sequelize');
const db = require('../db');

const Trip = db.define('trip', {
    To: {
        type: DataTypes.STRING,
        allowNull: false
    },
    From: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Flying: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Driving: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = Trip