const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('forms', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
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