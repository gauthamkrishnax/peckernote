const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const db = require("./db");

const app = express();
const port = process.env.port || 3000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
