const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, unique: true },
		lastName: { type: String },
		address: { type: String },
		phone: { type: Number },
		balance: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
