var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/google/callback",
		},
		function (acessToken, refreshToken, profile, done) {
			console.log("Authenticated");
			return done(null, profile);
		}
	)
);
