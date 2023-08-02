const { Post } = require('../models')

const postData = [
    {
        title: "Got an idea 💡",
        content: "I am going to buy SHOUT and rename it to Y",
        user_id: [1]
    },
    {
        title: "This weather!",
        content: "Weather is awful today! Grrr",
        user_id: [3]
    },
    {
        title: "First",
        content: "My first post on shout!",
        user_id: [4]
    },
    {
        title: "is this google?",
        content: "how do i get to google.com?",
        user_id: [6]
    },
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts;