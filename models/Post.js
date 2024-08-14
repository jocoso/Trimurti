const database = require("../connections/connections");
const { Model, DataTypes, NOW } = require("sequelize");

class Post extends Model {}

// What a post should look like.
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
            defaultValue: NOW,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        timestamps: false,
        modelName: 'Post',
    }

);

module.exports = Post;
