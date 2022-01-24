export default class user {
	constructor(username, displayName, password) {
		this.username = username;
		this.displayName = displayName;
		this.password = password;
		this.persist();
	}
	persist() {}
}
