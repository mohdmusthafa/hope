const { Sequelize } = require("sequelize");
const { applyRelations } = require('./associations');


const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hope',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
    define: {
        timestamps: false,
        underscored: true,
        underscoredAll: true
    }
}

const seqeulize = new Sequelize(DB_CONFIG.database, DB_CONFIG.username, DB_CONFIG.password, {
    dialect: 'postgres',
    host: DB_CONFIG.host,
    port: DB_CONFIG.port
})

const modelDefiners = [
    require('../models/bookings.model'),
    require('../models/visitors.model'),
    require('../models/centres.model'),
    require('../models/rooms.model'),
    require('../models/social_workers.model'),
    require('../models/form_types.model'),
    require('../models/forms.model')
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(seqeulize)
}

applyRelations(seqeulize);

// seqeulize.sync({ force: true })

module.exports = seqeulize;