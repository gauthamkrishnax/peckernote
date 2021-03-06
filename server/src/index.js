const express = require("express");
var helmet = require("helmet");
var cors = require("cors");
var session = require("express-session");
const MongoStore = require("connect-mongo");
var passport = require("passport");

//ENVIRONMENTAL VARIABLES
require("dotenv").config();
const port = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const SECRET_KEY_SESSION = process.env.SECRET_KEY_SESSION;

const app = express();
app.set("trust proxy", 1);

//EXPRESS MIDDLEWARES

// app.use(helmet());
// app.use(
// 	cors({
// 		orgin: "http://localhost:3000",
// 		optionsSuccessStatus: 200,
// 		credentials: true,
// 	})
// ); // Add orgin domain later
// app.use(cors());
app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Origin",
		"https://peckernote-web.herokuapp.com"
	); //https://peckernote.netlify.app
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DATABASE CONNECTION

const db = require("./middlewares/db");
// db.close();
db.connect(DB_HOST);

//SESSION MIDDLEWARES

app.use(
	session({
		secret: SECRET_KEY_SESSION,
		store: MongoStore.create({
			mongoUrl: DB_HOST,
			dbName: "sessions",
			collectionName: "sessions",
		}),
		resave: false,
		saveUninitialized: true,
		cookie: {
			sameSite: "none",
			secure: true,
			maxAge: 1000 * 60 * 60 * 24 * 3,
		}, // 3 days until user cookies are unset
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./middlewares/authentication"); //Passport.js Authentication Strategy - Google OAuth2

//API ROUTES

require("./app/authRoutes")(app);
require("./app/app")(app);

// SERVER

app.listen(port, () => {
	console.log(`\nApp listening at http://localhost:${port}`);
});
