module.exports = (req, res, next) => {
    const { centre_id } = req.query;
    
    if(!centre_id) {
        return res.status(400).json({ message: 'Please provide centre_id' })
    }

    req.centre_id = centre_id;
    next()
}