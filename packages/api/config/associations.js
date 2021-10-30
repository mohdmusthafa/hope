const applyRelations = (sequelize) => {
    const {
        bookings,
        rooms,
        centres,
        visitors,
        social_workers,
        forms,
        form_types
    } = sequelize.models;

    bookings.belongsTo(rooms, {
        foriegnKey: {
            name: 'fk_room_id',
            allowNull: false
        },
        as: 'room'
    })

    bookings.belongsTo(centres, {
        foriegnKey: {
            name: 'fk_centre_id',
            allowNull: false
        },
        as: 'centre'
    })

    bookings.belongsTo(visitors, {
        foriegnKey: {
            name: 'fk_booked_by',
            allowNull: false
        },
        as: 'booked_by'
    })

    rooms.belongsTo(centres, {
        foriegnKey: {
            name: 'fk_centre_id',
            allowNull: false
        },
        as: 'centre'
    })

    social_workers.belongsTo(centres, {
        foriegnKey: {
            name: 'fk_centre_id',
            allowNull: false
        },
        as: 'centre'
    })

    forms.belongsTo(visitors, {
        foriegnKey: {
            name: 'fk_uploaded_by',
            allowNull: false
        },
        as: 'uploaded_by'
    })

    forms.belongsTo(form_types, {
        foriegnKey: {
            name: 'fk_form_types',
            allowNull: false
        },
        as: 'type'
    })

}

module.exports = { applyRelations }