//Important App Fuction Routes :

module.exports = (app) => {
	//CRUD Operation functions.
	const notes = require("../middlewares/crud");

	//Check if user is logged in.
	const isLoggedIn = (req, res, next) => {
		if (req.user) {
			console.log(req.user);
			next();
		} else {
			console.log(req.session);
			res.send({ authfail: true }); //{ auth: null }
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
