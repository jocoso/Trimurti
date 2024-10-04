const { Model, DataTypes } = require('sequelize');
const database = require('../config/connections');

class User extends Model { }

// What an User should look like
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // PK for Login
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true
    }
);

module.exports = User;