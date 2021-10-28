const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('bookings', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        from: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        timestamps: false,
        underscored: true
    })
}