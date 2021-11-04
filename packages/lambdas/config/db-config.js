const { Sequelize } = require("sequelize");

module.exports = async () => {
    const DB_CONFIG = {
        host: process.env.DB_HOST || 'db',
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
        require('../models/visitors.model')
    ]
    
    for (const modelDefiner of modelDefiners) {
        modelDefiner(seqeulize)
    }

    await seqeulize.authenticate().then(() => {
        console.log('database connected..')
    }).catch(err => {
        console.log('unable to connect', err)
    })

    return seqeulize
}