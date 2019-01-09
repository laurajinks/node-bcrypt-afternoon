const bcrypt = require("bcryptjs");

module.exports = {
    register: async (req, res) => {
        const { username, password, isAdmin } = req.body;
        const hash = await bcrypt.hash(password, 10);
        req.app
            .get("db")
            .get_user(username)
            .then(user => {
                if (user[0]) {
                    res.status(409).json({ error: "User already exists" });
                } else {
                    req.app
                        .get("db")
                        .register_user(isAdmin, username, hash)
                        .then(response => {
                            const user = response[0];
                            res.status(201).json(user);
                        });
                }
            });
    }
};
