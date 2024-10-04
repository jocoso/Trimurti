const database = require('../config/connections');
const { Model, DataTypes, NOW } = require('sequelize');

const User = require('./User');
const Post = require('./Post');

class Comment extends Model {}

// What a post should look like.
Comment.init({
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
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Post,
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {
        sequelize: database,
        timestamps: false,
        modelName: 'Comment',
        tableName: 'Comments'
    }

);

// Associations

User.hasMany(Comment, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


Post.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Comment;
