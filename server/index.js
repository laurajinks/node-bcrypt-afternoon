require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");
const port = 4000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const SESSION_SECRET = process.env.SESSION_SECRET;
const { register, login, logout } = require("./controllers/authController");

const app = express();
app.use(json());

massive(CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log("Database Connected");
    })
    .catch(err => console.log(err));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
);

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);

app.listen(port, console.log(`listening on ${port}`));
