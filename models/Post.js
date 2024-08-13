const database = require("../connections/connections");
const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

Post.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_of_creation: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Post',
    }

);

module.exports = Post;
