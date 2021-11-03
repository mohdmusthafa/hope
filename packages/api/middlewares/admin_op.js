module.exports = (req, res, next) => {
    if(req.admin) {
        next();
    } else {
        return res.status(401).json({ message: 'Permission Denied' })
    }
}