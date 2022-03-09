const router = require("express").Router();
const Vendor = require("../models/Vendor");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create Vendor
router.post("/new", async (req, res) => {
	try {
		const vendor = new Vendor(req.body);
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

//  verifyTokenAndAdminManager
// //Update vendor
router.put("/:id", async (req, res) => {
	const { vendor, entity, type, status } = req.body;

	const query = { _id: req.params.id };
	const updateBuyData = {
		$inc: { balance: entity.totalBilled },
		$push: { bills: entity },
	};
	const updatePayData = {
		$inc: { balance: -entity.paid },
		$push: { payments: entity },
	};
	const queryTotal = { bills: { $elemMatch: { _id: entity.billId } } };
	const updateTotalPaid = {
		$inc: { "bills.$.totalPaid": entity.paid },
		$set: { "bills.$.status": status },
	};

	try {
		if (type === "buy" && vendor.company) {
			const updatedVendor = await Vendor.updateOne(query, updateBuyData);
			res.status(200).json(updatedVendor);
		} else if (type === "pay") {
			const updatedVendor = await Vendor.updateOne(query, updatePayData);
			const totalPaid = await Vendor.updateOne(queryTotal, updateTotalPaid);
			res.status(200).json({ updatedVendor, totalPaid });
		}
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
});

// verifyTokenAndAdminManager
// //Delete vendor
router.delete("/:id", async (req, res) => {
	try {
		await Vendor.findByIdAndDelete(req.params.id);
		res.status(200).json("Vendor deleted");
	} catch (error) {
		res.status(500).json(error);
	}
});

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
