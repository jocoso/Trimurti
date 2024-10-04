const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false  // Disable createdAt and updatedAt
});

module.exports = User;
