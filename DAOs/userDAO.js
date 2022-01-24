import pg from "pg";
import user from "../models/user.js";
import dbInfo from "../utils/dbinfo.js";

export default class UserDAO {
	constructor() {
		this.client = new pg.Client(dbInfo);
		this.table_name = "user_table";
	}
	async open() {
		await this.client.connect().then((x) => {
			this.client.query("SET statement_timeout TO 15000");
			this.isOpen = true;
		});
	}
	close() {
		this.client.end();
		this.isOpen = false;
	}

	async verifyConnection() {
		if (!this.isOpen) throw "Connection closed";
		let now = await this.client.query("Select NOW()");
		return now;
	}
	async getTables() {
		if (!this.isOpen) throw "Connection closed";
		let tables = await this.client.query(
			"SELECT t.TABLE_NAME FROM INFORMATION_SCHEMA.TABLES t WHERE t.TABLE_SCHEMA = 'public' "
		);
		return tables;
	}
	async createTableIfNotExist() {
		let tables = await this.getTables();
		if (tables.rows.includes((x) => x.table_name === this.table_name)) return;
		let temp = new user("string", "string", "string");
		let rows = Object.getOwnPropertyNames(temp);
		let query =
			"CREATE TABLE " +
			this.table_name +
			" ( " +
			rows.map(
				(row) =>
					row +
					" " +
					(row === "id"
						? "integer PRIMARY KEY "
						: UserDAO.typeToSQL(temp[row])) +
					" "
			) +
			")";
		this.client.query(query);
	}
	async create() {
		if (!this.isOpen) throw "Connection closed";
	}
	async read() {
		if (!this.isOpen) throw "Connection closed";
	}
	async update() {
		if (!this.isOpen) throw "Connection closed";
	}
	async delete() {
		if (!this.isOpen) throw "Connection closed";
	}
	static typeToSQL(type) {
		switch (typeof type) {
			case "string":
				return "text";
			case "number":
				return "numeric";
			default:
				"string";
				break;
		}
	}
}
