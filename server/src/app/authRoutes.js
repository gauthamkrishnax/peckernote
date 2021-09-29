var passport = require("passport");
var cors = require("cors");

//Auth Routes
module.exports = (app) => {
	//Register with google - SignUp Button Onclick Route
	app.get(
		"/google",
		cors({ orgin: "*" }),
		passport.authenticate("google", { scope: ["Profile"] })
	);

	//Route After Authentication
	app.get(
		"/google/callback",
		passport.authenticate("google", { failureRedirect: "/authFail" }),
		function (req, res) {
			res.redirect("http://localhost:3000/profile");
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
