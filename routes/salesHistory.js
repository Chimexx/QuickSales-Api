const router = require("express").Router();
const SalesHistory = require("../models/SalesHistory");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create SalesHistory
router.post("/new", async (req, res) => {
	const saleshistory = new SalesHistory(req.body);
	try {
		const savedSalesHistory = await saleshistory.save();
		res.status(201).json(savedSalesHistory);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Get SalesHistory
router.get("/find/:id", async (req, res) => {
	try {
		const saleshistory = await SalesHistory.findById(req.params.id);
		res.status(200).json(saleshistory);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Update SalesHistory
router.put("/:id", async (req, res) => {
	try {
		const updatedSalesHistory = await SalesHistory.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedSalesHistory);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Delete saleshistory
router.delete("/:id", async (req, res) => {
	try {
		await SalesHistory.findByIdAndDelete(req.params.id);
		res.status(200).json("History Deleted");
	} catch (error) {
		res.status(500).json(error);
	}
});

//Get All SalesHistorys
router.get("/", async (req, res) => {
	try {
		const sort = { createdAt: -1 };
		const salesHistorys = await SalesHistory.find().sort(sort);

		res.status(200).json(salesHistorys);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
