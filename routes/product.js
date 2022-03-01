const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create Product
router.post("/new", async (req, res) => {
	try {
		const product = new Product({
			...req.body,
			availQty: req.body.onHandQty,
			onHandQty: 0,
		});
		const savedProduct = await product.save();
		res.status(201).json(savedProduct);
	} catch (error) {
		console.log(error);

		res.status(500).json(error);
	}
});

//  verifyTokenAndAdminManagerOwner,
//Get Product
router.get("/find/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Receive Products
router.put("/receive", async (req, res) => {
	try {
		async function update(docs) {
			const operation = docs.map((doc) => ({
				updateOne: {
					filter: { _id: doc._id },
					update: { $set: { availQty: (doc.availQty += doc.onHandQty) } },
					upsert: false,
				},
			}));
			const result = await Product.bulkWrite(operation);
			return res.status(200).json(result);
		}

		update(req.body);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Sell Products
router.put("/sell", async (req, res) => {
	try {
		async function update(docs) {
			const operation = docs.map((doc) => ({
				updateOne: {
					filter: { _id: doc._id },
					update: { $set: { availQty: (doc.availQty -= doc.onHandQty) } },
					upsert: false,
				},
			}));
			const result = await Product.bulkWrite(operation);
			return res.status(200).json(result);
		}

		update(req.body.items);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Update Product
router.put("/:id", async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json(error);
	}
});
//  verifyTokenAndAdminManager,
//Delete product
router.delete("/:id", async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("Product deleted");
	} catch (error) {
		res.status(500).json(error);
	}
});

//Get All Products
router.get("/", async (req, res) => {
	const filterQuery = req.query.filter;
	try {
		let products;
		if (filterQuery) {
			products = await Product.find({ itemName: { $in: [filterQuery] } });
		} else {
			products = await Product.find();
		}

		res.status(200).json(products);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
