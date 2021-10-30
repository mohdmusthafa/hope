const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('forms', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        form_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    })
}