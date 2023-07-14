const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFollow extends Model {}

UserFollow.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        follow_user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'userfollow',
    }
)

module.exports = UserFollow;