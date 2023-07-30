const User = require('./User.js');
const Post = require('./Post.js');
const UserFollow = require('./UserFollow.js');
const Comment = require('./Comment.js')

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(User, {
    through: UserFollow,
    as: 'following',
    foreignKey: 'user_id'
});

User.belongsToMany(User, {
    through: UserFollow,
    as: 'follower',
    foreignKey: 'follow_user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {
    User,
    Post,
    UserFollow,
    Comment
};