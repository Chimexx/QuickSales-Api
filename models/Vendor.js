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
		account: { type: Number },
		balance: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
