const router = require("express").Router();
const Department = require("../models/Department");
const { verifyTokenAndAdminManagerOwner } = require("./verifyToken");

//Create Department
router.post("/new", async (req, res) => {
	const department = new Department(req.body);
	try {
		const savedDepartment = await department.save();
		res.status(201).json(savedDepartment);
	} catch (error) {
		res.status(500).json(error);
	}
});

//  verifyTokenAndAdminManagerOwner,
//Get Department
router.get("/find/:id", async (req, res) => {
	try {
		const departments = await Department.findById(req.params.id);
		res.status(200).json(departments);
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

//Get All Departments
router.get("/", async (req, res) => {
	try {
		const departments = await Department.find();
		res.status(200).json(departments);
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
});

module.exports = router;
