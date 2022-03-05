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
				_id: { type: String },
				amount: { type: Number, default: 0 },
				closed: { type: Boolean, default: false },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
