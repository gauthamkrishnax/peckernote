var passport = require("passport");

//Auth Routes
module.exports = (app) => {
	app.get("/google", passport.authenticate("google", { scope: ["Profile"] }));

	app.get(
		"/google/callback",
		passport.authenticate("google", { failureRedirect: "/authFail" }),
		function (req, res) {
			res.send(req.user);
		}
	);

	app.get("/authFail", function (req, res) {
		res.send({ auth: null });
	});

	app.get("/logout", function (req, res) {
		req.logout();
		res.send({ auth: null });
	});
};
