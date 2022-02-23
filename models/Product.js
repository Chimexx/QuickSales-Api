const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		itemName: { type: String, required: true, unique: true },
		description: { type: String },
		department: { type: String, default: "system" },
		salesPrice: { type: Number, required: true },
		costPrice: { type: Number, required: true },
		wholesalePrice: { type: Number },
		retailPrice: { type: Number },
		vendor: { type: String },
		expiryDate: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
