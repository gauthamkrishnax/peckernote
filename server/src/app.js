module.exports = (app) => {
	const notes = require("./middlewares/controller");

	//Auth Routes

	app.get(
		"/google/callback",
		passport.authenticate("google", { scope: ["Profile"] }),
		function (req, res) {
			res.redirect("/");
		}
	);

	//CRUD

	// Create a new Note
	app.post("/note", notes.create);
	// Retrieve all Notes
	app.get("/notes", notes.findAll);
	// Update a Note with noteId
	app.put("/note/:noteId", notes.update);
	// Delete a Note with noteId
	app.delete("/note/:noteId", notes.delete);

	//Other Routes

	app.get("/", (req, res) => {
		res.send(req.user);
	});
};
