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

//verifyTokenAndAdminManager
// //Update department
router.put("/:id", async (req, res) => {
	try {
		const updatedDepartment = await Department.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedDepartment);
	} catch (error) {
		res.status(500).json(error);
	}
});

//verifyTokenAndAdminManager
// //Delete department
router.delete("/:id", async (req, res) => {
	try {
		await Department.findByIdAndDelete(req.params.id);
		res.status(200).json("Department deleted");
	} catch (error) {
		res.status(500).json(error);
	}
});

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
