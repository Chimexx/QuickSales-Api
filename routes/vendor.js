const router = require("express").Router();
const Vendor = require("../models/Vendor");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create Vendor
router.post("/new", async (req, res) => {
	const vendor = new Vendor(req.body);
	try {
		const savedVendor = await vendor.save();
		res.status(201).json(savedVendor);
	} catch (error) {
		res.status(500).json(error);
	}
});

//  verifyTokenAndAdminManagerOwner,
//Get Vendor
router.get("/find/:id", async (req, res) => {
	try {
		const vendor = await Vendor.findById(req.params.id);
		res.status(200).json(vendor);
	} catch (error) {
		res.status(500).json(error);
	}
});

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

//Get All Vendors
router.get("/", async (req, res) => {
	try {
		const vendors = await Vendor.find();
		res.status(200).json(vendors);
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
});

module.exports = router;
