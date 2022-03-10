const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, unique: true },
		lastName: { type: String },
		address: { type: String },
		phone: { type: Number },
		balance: { type: Number, default: 0 },
		credits: [
			{
				totalCredited: { type: Number, default: 0 },
				status: { type: String, default: "Open" },
				date: { type: String },
				totalPaid: { type: Number, default: 0 },
			},
		],
		payments: [
			{
				paid: { type: Number, default: 0 },
				date: { type: String },
				creditId: { type: String },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
