const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	userID: { type: String, required: true, unique: true }
});

userSchema.statics.findByUsername = function (username) {
	return this.findOne({ username });
};

const User = mongoose.model("User", userSchema);

module.exports = User;