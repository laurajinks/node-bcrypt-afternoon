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
    },

    addMyTreasure: (req, res) => {
        const { treasureURL } = req.body;
        const { id } = req.session.user;
        req.app
            .get("db")
            .add_user_treasure([treasureURL, id])
            .then(response => res.status(200).json(response));
    },

    getAllTreasure: (req, res) => {
        req.app
            .get("db")
            .get_all_treasure()
            .then(response => res.status(200).json(response));
    }
};
