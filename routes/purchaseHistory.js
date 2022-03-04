const router = require("express").Router();
const PurchaseHistory = require("../models/PurchaseHistory");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create PurchaseHistory
router.post("/new", async (req, res) => {
	const purchasehistory = new PurchaseHistory(req.body);
	try {
		const savedPurchaseHistory = await purchasehistory.save();
		res.status(201).json(savedPurchaseHistory);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Get PurchaseHistory
router.get("/find/:id", async (req, res) => {
	try {
		const purchasehistory = await PurchaseHistory.findById(req.params.id);
		res.status(200).json(purchasehistory);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Update PurchaseHistory
router.put("/:id", async (req, res) => {
	try {
		const updatedPurchaseHistory = await PurchaseHistory.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedPurchaseHistory);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Delete purchasehistory
router.delete("/:id", async (req, res) => {
	try {
		await PurchaseHistory.findByIdAndDelete(req.params.id);
		res.status(200).json("History Deleted");
	} catch (error) {
		res.status(500).json(error);
	}
});

//Get All PurchaseHistorys
router.get("/", async (req, res) => {
	try {
		const sort = { createdAt: -1 };
		const purchaseHistorys = await PurchaseHistory.find().sort(sort);

		res.status(200).json(purchaseHistorys);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
