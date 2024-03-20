const Sequelize = require('sequelize');

const { DB, HOST, USER, PASSWORD, dialect, pool } = require('../config/dbConfig')

const sequelizeInit = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    pool: pool
});

const db = {}

db.Sequelize = Sequelize;

db.sequelize = sequelizeInit;

db.user = require('./user.model')(sequelizeInit, Sequelize)

db.sequelize.sync({ force: false }).then(() => {
    console.log(`Database & tables created!`);
})

module.exports = db;