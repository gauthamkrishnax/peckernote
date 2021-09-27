const User = require("../schema/user");

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
	User.findById(req.user._id, {})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({ error: err, message: "Error fetching Data !" });
		});
};

// Create and Save a new Note
exports.create = (req, res) => {
	// Validate request
	if (!req.body.content) {
		return res.status(400).send({
			done: false,
			message: "Note content can not be empty",
		});
	}
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$push: {
				notes: {
					title: req.body.title || null,
					content: req.body.content,
				},
			},
		}
	)
		.then((data) => {
			res.send({ done: true });
		})
		.catch((err) => {
			res.send({
				done: false,
				error: err,
				message: "Could not create Note !",
			});
		});
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
	// Validate request
	if (!req.body._id) {
		return res.status(400).send({
			done: false,
			message: "Note content can not be empty",
		});
	}

	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$push: {
				notes: {
					title: req.body.title,
					content: req.body.content,
				},
			},
		}
	)
		.then((data) => {
			User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$pull: {
						notes: { _id: req.body._id },
					},
				}
			).then(() => {
				res.send({ done: true });
			});
		})
		.catch((err) => {
			res.send({
				done: false,
				error: err,
				message: "Could not Update Note !",
			});
		});
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	if (!req.body._id) {
		return res.status(400).send({
			done: false,
			message: "Note content can not be empty",
		});
	}

	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$pull: {
				notes: { _id: req.body._id },
			},
		}
	)
		.then((data) => {
			res.send({ done: true });
		})
		.catch((err) => {
			res.send({
				done: false,
				error: err,
				message: "Could not Delete Note !",
			});
		});
};
