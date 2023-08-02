const { Comment } = require('../models')

const commentData = [
    {
        comment: "Thats a dumb idea...",
        post_id: [1],
        user_id: [3]
    },
    {
        comment: "I know! All this rain in August!",
        post_id: [2],
        user_id: [6]
    },
    {
        comment: "Welcome!",
        post_id: [3],
        user_id: [5]
    },
    {
        comment: "Get off SHOUT mum!",
        post_id: [4],
        user_id: [4]
    },
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments;