const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('rooms', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        underscored: true
    })
}