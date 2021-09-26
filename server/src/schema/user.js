const mongoose = require("mongoose");
const noteSchema = require(noteSchema);

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	notes: [noteSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
