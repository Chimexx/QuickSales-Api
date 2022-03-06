const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
	{
		company: { type: String, required: true, unique: true },
		firstName: { type: String },
		lastName: { type: String },
		address: { type: String },
		state: { type: String },
		phone: { type: Number },
		bank: { type: String },
		accountNo: { type: Number },
		balance: { type: Number, default: 0 },
		openAccount: [
			{
				items: { type: Array },
				amount: { type: Number, default: 0 },
				status: { type: String, default: "open" },
				date: { type: String },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
