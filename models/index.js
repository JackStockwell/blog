const User = require('./User.js');
const Post = require('./Post.js');
const UserFollow = require('./UserFollow.js');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(User, {
    through: UserFollow,
    as: 'followers',
    foreignKey: 'user_id'
});

User.belongsToMany(User, {
    through: UserFollow,
    as: 'following',
    foreignKey: 'follow_user_id'
});

module.exports = {
    User,
    Post,
    UserFollow
};