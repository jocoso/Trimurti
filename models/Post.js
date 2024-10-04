<<<<<<< HEAD
const database = require("../connections/connections");
const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

Post.init({
        id: {
=======
const database = require('../config/connections');
const { Model, DataTypes, NOW } = require('sequelize');
const User = require('./User');

class Post extends Model {}

// What a post should look like.
Post.init({
        id: {   
>>>>>>> df066bd4f3cd07381f520d420fc6ab82039d3cd9
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
<<<<<<< HEAD
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_of_creation: {
            type: DataTypes.DATE,
            allowNull: false,
=======
        date_of_creation: {
            type: DataTypes.DATE,
            defaultValue: NOW,
>>>>>>> df066bd4f3cd07381f520d420fc6ab82039d3cd9
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
<<<<<<< HEAD
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Post',
=======
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User, 
                key: 'id'
            },
        }
    },
    {
        sequelize: database,
        timestamps: false,
        modelName: 'Post',
        tableName: 'Posts'
>>>>>>> df066bd4f3cd07381f520d420fc6ab82039d3cd9
    }

);

<<<<<<< HEAD
=======
User.hasMany(Post, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

>>>>>>> df066bd4f3cd07381f520d420fc6ab82039d3cd9
module.exports = Post;
