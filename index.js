//import express
const express = require("express");
//create application
const app = express();
//define port
const port = 3000;

//define route as root for a get request
app.get("/", (req, res) => {
	res.send("Hello World!");
});

//listen on port
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
