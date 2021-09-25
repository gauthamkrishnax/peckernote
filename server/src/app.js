module.exports = (app) => {
	const notes = require("./middleware/controller");

	// Create a new Note
	app.post("/note", notes.create);

	// Retrieve all Notes
	app.get("/notes", notes.findAll);

	// Update a Note with noteId
	app.put("/note/:noteId", notes.update);

	// Delete a Note with noteId
	app.delete("/note/:noteId", notes.delete);
};
