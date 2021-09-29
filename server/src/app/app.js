//Important App Fuction Routes :

module.exports = (app) => {
	//CRUD Operation functions.
	const notes = require("../middlewares/crud");

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header("Access-Control-Allow-Credentials", true);
		next();
	});

	//Check if user is logged in.
	const isLoggedIn = (req, res, next) => {
		if (req.user) {
			next();
		} else {
			res.send({ req: "hi" }); //{ auth: null }
		}
	};
	//CRUD

	// Create a new Note
	app.post("/note", isLoggedIn, notes.create);
	// Retrieve all Notes
	app.get("/notes", isLoggedIn, notes.findAll);
	// Update a Note with noteId
	app.put("/note", isLoggedIn, notes.update);
	// Delete a Note with noteId
	app.delete("/note", isLoggedIn, notes.delete);
};
