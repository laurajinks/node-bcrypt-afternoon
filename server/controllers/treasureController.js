module.exports = {
    dragonTreasure: (req, res) => {
        req.app
            .get("db")
            .get_dragon_treasure(1)
            .then(response => {
                res.status(200).json(response);
            });
    },

    getUserTreasure: (req, res) => {
        req.app
            .get("db")
            .get_user_treasure(req.session.user.id)
            .then(response => res.status(200).json(response));
    }
};
