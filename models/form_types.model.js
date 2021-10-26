const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('form_types', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        timestamps: false
    })
}