module.exports = {
    usersOnly: (req, res, next) => {
        if (!req.session.user) {
            res.status(401).json("Please log in");
        } else {
            next();
        }
    }
};
