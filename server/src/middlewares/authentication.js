var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

//User Schema With Notes Array.
var User = require("../schema/user");

passport.serializeUser(function (user, done) {
	done(null, user.userID);
});

passport.deserializeUser(function (id, done) {
	User.find({ userID: id }, function (err, user) {
		if (err) {
			res.status(500).send({
				message:
					err.message + ": \nSome error occurred while fetching your account",
			});
		}
		done(err, user[0]);
	});
});

//Passport.js Auth Strategy
// Make sure to change the Orgin links in Google API Console after production deployment.
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/google/callback", //Should change
		},
		function (acessToken, refreshToken, profile, done) {
			User.find({ userID: profile.id }, function (err, user) {
				if (err) {
					res.status(500).send({
						message:
							err.message +
							": \nSome error occurred while fetching your account",
					});
				}
				if (user.length) {
					// If user already exists - Log In({ Supply User details })
					return done(err, user[0]);
				} else {
					//Else add new user with empty Notes array
					const newUser = new User({
						userID: profile.id,
						username: profile.name.givenName,
						picture: profile.photos[0].value,
						notes: [],
					});
					newUser
						.save()
						.then((user) => {
							return done(err, user);
						})
						.catch((err) => {
							res.status(500).send({
								message:
									err.message +
									": \nSome error occurred while creating your account",
							});
						});
				}
			});
		}
	)
);
