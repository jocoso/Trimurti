const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections'); // Ensure sequelize is imported correctly
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {}

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
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date_of_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    post_id: { // Ensure this matches your table schema
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    }
}, {
    sequelize, // Pass the sequelize instance here
    timestamps: false,
    modelName: 'Comment',
    tableName: 'Comments'
});

// Associations
User.hasMany(Comment, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Comment;
