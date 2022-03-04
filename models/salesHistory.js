const mongoose = require("mongoose");

const SalesHistorySchema = new mongoose.Schema(
	{
		items: { type: Array, required: true },
		totalAmt: { type: Number, default: 0, required: true },
		cashier: { type: String },
		customer: { type: Object },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("SalesHistory", SalesHistorySchema);
