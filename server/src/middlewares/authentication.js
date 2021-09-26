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
			clientID:
				"659911190912-198716kqoirdvdnm15lcs8njpo53m0ge.apps.googleusercontent.com",
			clientSecret: "rGKkDFaJtUdIHZus3XsL_EgT",
			callbackURL: "http://localhost:5000/google/callback",
		},
		function (acessToken, refreshToken, profile, done) {
			console.log("Authenticated");
			return done(null, profile);
		}
	)
);
