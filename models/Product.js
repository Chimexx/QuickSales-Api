const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		itemName: { type: String, required: true, unique: true },
		description: { type: String },
		department: { type: String, default: "system" },
		salesPrice: { type: Number, required: true },
		costPrice: { type: Number, required: true },
		wholesalePrice: { type: Number, default: 0 },
		retailPrice: { type: Number, default: 0 },
		customPrice: { type: Number, default: 0 },
		vendor: { type: String, default: "system" },
		expiryDate: { type: String },
		onHandQty: { type: Number, default: 0 },
		availQty: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
