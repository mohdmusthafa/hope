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
        foriegnKey: 'fk_room_id',
        as: 'room',
    })

    bookings.belongsTo(centres, {
        foriegnKey: 'fk_centre_id',
        as: 'centre'
    })

    bookings.belongsTo(visitors, {
        foriegnKey: 'fk_booked_by',
        as: 'booked_by'
    })

    rooms.belongsTo(centres, {
        foriegnKey: 'fk_centre_id',
        as: 'centre'
    })

    social_workers.belongsTo(centres, {
        foriegnKey: 'fk_centre_id',
        as: 'centre'
    })

    forms.belongsTo(visitors, {
        foriegnKey: 'fk_uploaded_by',
        as: 'uploaded_by'
    })

    forms.belongsTo(form_types, {
        foriegnKey: 'fk_form_types',
        as: 'type'
    })

}

module.exports = { applyRelations }