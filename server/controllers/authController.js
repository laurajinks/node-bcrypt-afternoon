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
    },

    login: (req, res) => {
        const { username, password } = req.body;
        req.app
            .get("db")
            .get_user(username)
            .then(response => {
                const foundUser = response;
                const user = foundUser[0];
                if (!user) {
                    res.status(401).json({
                        error:
                            "User not found. Register as a new user, or else..."
                    });
                } else {
                    bcrypt.compare(password, user.hash).then(response => {
                        const isAuthenticated = response;

                        if (!isAuthenticated) {
                            res.status(403).json({
                                error: "Incorrect password"
                            });
                        } else {
                            req.session.user = {
                                isAdmin: user.is_admin,
                                id: user.id,
                                username: user.username
                            };
                            res.status(200).json(req.session.user);
                        }
                    });
                }
            });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.status(200).json("okay");
    }
};
