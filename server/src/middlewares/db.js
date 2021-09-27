const mongoose = require("mongoose");

module.exports = {
	connect: (DB_HOST) => {
		mongoose.connect(DB_HOST).then(() => {
			console.log("\n\t 🔰 Successfully connected to the database");
		});
		//connect to db
		mongoose.connection.on("error", (err) => {
			console.log(err);
			console.log("\n\t 😡 MongoDB Connection error !");
			process.exit();
		});
	},

	//Not used
	close: () => {
		mongoose.connect.close();
	},
};
