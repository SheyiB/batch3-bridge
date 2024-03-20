const Sequelize = require('sequelize')

const model = Sequelize.Model

const userModel = (sequelize, DataTypes) => {
    class User extends model {
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
        sequelize,
        modelName: 'user',
        tableName: 'user',
        timestamps: true
    })
    return User;
}

module.exports = userModel;
