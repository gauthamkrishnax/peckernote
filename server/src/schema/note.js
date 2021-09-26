const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		order: {
			type: Number,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = noteSchema;
