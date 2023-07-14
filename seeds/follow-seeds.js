const { UserFollow } = require('../models/');

const userFollow = [
  {
    user_id: 1,
    follow_user_id: 2,
  },
  {
    user_id: 1,
    follow_user_id: 3,
  },
  {
    user_id: 1,
    follow_user_id: 4,
  },
];

const seedProductTags = () => UserFollow.bulkCreate(userFollow);

module.exports = seedProductTags;