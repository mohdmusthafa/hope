const { Sequelize } = require("sequelize");

const applyRelations = (sequelize) => {

}

const DB_CONFIG = {
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
}

const seqeulize = new Sequelize(DB_CONFIG.database, DB_CONFIG.username, DB_CONFIG.password, {
    dialect: 'postgres',
    host: DB_CONFIG.host
})

const modelDefiners = [
    require('../models/bookings.model')
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(seqeulize)
}

applyRelations(seqeulize);

module.exports = seqeulize;