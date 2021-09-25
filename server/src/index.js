const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/addNote", async (req, res) => {
	console.log(req.body);
	res.send("Note saved !");
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
