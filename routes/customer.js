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
	try {
		if (req.body.customer.firstName && req.body.sale === true) {
			const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
				balance: req.body.customer.balance + req.body.total,
			});
			res.status(200).json(updatedCustomer);
		} else if (req.body.customer.firstName && req.body.sale !== true) {
			const updatedCustomer = await Customer.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true }
			);
			res.status(200).json(updatedCustomer);
		} else {
			return;
		}
	} catch (error) {
		res.status(500).json(error);
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
