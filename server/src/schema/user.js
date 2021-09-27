const mongoose = require("mongoose");
const noteSchema = require("./note");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	userID: {
		type: String,
		required: true,
	},
	picture: { type: String },
	notes: [noteSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
