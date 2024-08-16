const database = require('../config/connections');
const { Model, DataTypes, NOW } = require('sequelize');
const User = require('./User');

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
        date_of_creation: {
            type: DataTypes.DATE,
            defaultValue: NOW,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
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
    }

);

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

module.exports = Post;
