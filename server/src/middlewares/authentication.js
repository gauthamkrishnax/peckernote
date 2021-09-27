var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

var User = require("../schema/user");

passport.serializeUser(function (user, done) {
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => {
			done(err);
		});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/google/callback",
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
					return done(err, user);
				} else {
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
