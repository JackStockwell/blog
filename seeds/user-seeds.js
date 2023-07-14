const { User } = require('../models')

const userData = [
    {
        "username": "FooUser",
        "email": "foo@email.com",
        "password": "encryptedPassword420"
    },
    {
        "username": "dooUser",
        "email": "doqqqqqqqo@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "dsssooUser",
        "email": "doqqqqqo@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "dowdawdawdr",
        "email": "doqqqqq123123qo@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "testesdooUser",
        "email": "doqqqo@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "qqqqdooUser",
        "email": "doqo@email.com",
        "password": "thisismypassword"
    },
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers;