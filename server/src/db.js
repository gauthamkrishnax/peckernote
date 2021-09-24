const mongoose = require("mongoose");

module.exports = {
	connect: (DB_HOST) => {
		mongoose.connect(DB_HOST); //connect to db
		mongoose.connection.on("error", (err) => {
			console.log(err);
			console.log("MongoDB Connection error !");
			process.exit();
		});
	},

	close: () => {
		mongoose.connect.close();
	},
};
