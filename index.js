//import express
import express from "express";
import UserDAO from "./DAOs/userDAO.js";
import Client from "./utils/dbinfo.js";
//create application
const app = express();
//define port
const port = 3000;
const userdao = new UserDAO();
await userdao.open();
await userdao.createTableIfNotExist();

//define route as root for a get request
app.get("/", async (req, res) => {
	res.send(await (await userdao.getTables()).rows);
});

//listen on port
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
