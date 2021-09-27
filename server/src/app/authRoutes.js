var passport = require("passport");

//Auth Routes
module.exports = (app) => {
	//Register with google - SignUp Button Onclick Route
	app.get("/google", passport.authenticate("google", { scope: ["Profile"] }));

	//Route After Authentication
	app.get(
		"/google/callback",
		passport.authenticate("google", { failureRedirect: "/authFail" }),
		function (req, res) {
			res.send(req.user);
		}
	);

	//Route if Authentication Fail
	app.get("/authFail", function (req, res) {
		res.send({ auth: null });
	});

	//Logout button onClick Route
	app.get("/logout", function (req, res) {
		req.logout();
		res.send({ auth: null });
	});
};
