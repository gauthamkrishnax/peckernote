const express = require("express");
var helmet = require("helmet");
var cors = require("cors");
var session = require("express-session");
const MongoStore = require("connect-mongo");
var passport = require("passport");

require("dotenv").config();

const db = require("./middlewares/db");

const app = express();
const port = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

//EXPRESS MIDDLEWARES

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DATABASE CONNECTION

const conn = db.connect(DB_HOST);

//SESSION MIDDLEWARES

app.use(
	session({
		secret: process.env.SECRET_KEY_SESSION,
		store: MongoStore.create({
			mongoUrl: DB_HOST,
			dbName: "sessions",
			collectionName: "sessions",
		}),
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 }, // 3 days
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./middlewares/authentication");

//API ROUTES

// require("./app")(app);

app.get("/", (req, res) => {
	res.send(req.user);
});

app.get(
	"/google/callback",
	passport.authenticate("google", { scope: ["Profile"] }),
	function (req, res) {
		res.redirect("/");
	}
);

// SERVER

app.listen(port, () => {
	console.log(`\nApp listening at http://localhost:${port}`);
});
