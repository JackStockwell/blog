const { User } = require('../models')

const userData = [
    {
        "username": "FooUser",
        "email": "foo@email.com",
        "password": "encryptedPassword420"
    },
    {
        "username": "dooUser",
        "email": "userdoo@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "Jack",
        "email": "jackkkk@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "Jill",
        "email": "jilly@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "Jasmine",
        "email": "jaz@email.com",
        "password": "thisismypassword"
    },
    {
        "username": "mumUser",
        "email": "mum@email.com",
        "password": "thisismypassword"
    },
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers;