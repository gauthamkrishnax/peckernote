const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
var cors = require("cors");

const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "You are now connected with PeckerNote API." });
});

require("./app")(app);

app.listen(port, () => {
	console.log(`\nApp listening at http://localhost:${port}`);
});
