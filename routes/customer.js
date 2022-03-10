const router = require("express").Router();
const Customer = require("../models/Customer");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create Customer
router.post("/new", async (req, res) => {
	console.log(req.body);
	const customer = new Customer(req.body);
	try {
		const savedCustomer = await customer.save();
		res.status(201).json(savedCustomer);
	} catch (error) {
		res.status(500).json(error);
	}
});

//  verifyTokenAndAdminManagerOwner,
//Get Customer
router.get("/find/:id", async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);
		res.status(200).json(customer);
	} catch (error) {
		res.status(500).json(error);
	}
});

//  verifyTokenAndAdminManager
// //Update customer
router.put("/:id", async (req, res) => {
	const { customer, entity, type, status } = req.body;
	console.log(req.body);

	const query = { _id: req.params.id };
	const updateCreditData = {
		$inc: { balance: entity.totalCredited },
		$push: { credits: entity },
	};
	const updatePayData = {
		$inc: { balance: -entity.paid },
		$push: { payments: entity },
	};
	const queryTotal = { credits: { $elemMatch: { _id: entity.creditId } } };
	const updateTotalPaid = {
		$inc: { "credits.$.totalPaid": entity.paid },
		$set: { "credits.$.status": status },
	};

	try {
		if (type === "credit" && customer.firstName) {
			const updatedCustomer = await Customer.updateOne(query, updateCreditData);
			res.status(200).json(updatedCustomer);
		} else if (type === "pay") {
			const updatedCustomer = await Customer.updateOne(query, updatePayData);
			const totalPaid = await Customer.updateOne(queryTotal, updateTotalPaid);
			res.status(200).json({ updatedCustomer, totalPaid });
		}
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
});

// verifyTokenAndAdminManager
// //Delete customer
router.delete("/:id", async (req, res) => {
	try {
		await Customer.findByIdAndDelete(req.params.id);
		res.status(200).json("Customer deleted");
	} catch (error) {
		res.status(500).json(error);
	}
});

//Get All Customers
router.get("/", async (req, res) => {
	try {
		const customers = await Customer.find();
		res.status(200).json(customers);
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
});

module.exports = router;
