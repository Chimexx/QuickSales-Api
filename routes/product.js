const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create Product
router.post("/new", async (req, res) => {
	const product = new Product(req.body);
	try {
		const savedProduct = await product.save();
		res.status(201).json(savedProduct);
	} catch (error) {
		res.status(500).json(error);
	}
});

//  verifyTokenAndAdminManagerOwner,
// //Get dish
// router.get("/find/:id", async (req, res) => {
// 	try {
// 		const dish = await Dish.findById(req.params.id);
// 		res.status(200).json(dish);
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });

// //Update dish
// router.put("/:id", verifyTokenAndAdminManager, async (req, res) => {
// 	try {
// 		const updatedDish = await Dish.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
// 		res.status(200).json(updatedDish);
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });

// //Delete dish
// router.delete("/:id", verifyTokenAndAdminManager, async (req, res) => {
// 	try {
// 		await Dish.findByIdAndDelete(req.params.id);
// 		res.status(200).json("Dish deleted");
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });

//Get All Products

router.get("/", async (req, res) => {
	try {
		const products = await Product.find();

		res.status(200).json(products);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
