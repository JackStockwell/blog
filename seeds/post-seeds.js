const { Post } = require('../models')

const postData = [
    {
        "content": "My super cool new thread!",
        "user_id": [1]
    },
    {
        "content": "Haven't got a scooby doo?",
        "user_id": [2]
    },
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts;