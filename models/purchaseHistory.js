const mongoose = require("mongoose");

const PurchaseHistorySchema = new mongoose.Schema(
	{
		items: { type: Array, required: true },
		totalAmt: { type: Number, default: 0, required: true },
		cashier: { type: String },
		vendor: { type: Object },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("PurchaseHistory", PurchaseHistorySchema);
