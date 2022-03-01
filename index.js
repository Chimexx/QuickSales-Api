//packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//routes
const productRoute = require("./routes/product");
const departmentRoute = require("./routes/department");
const vendorRoute = require("./routes/vendor");
const customerRoute = require("./routes/customer");
// const authRoute = require("./routes/auth");
// const usersRoute = require("./routes/users");

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("DB connection successful");
	})
	.catch((error) => {
		console.log(error);
	});

app.use(cors());
app.use(express.json());
// app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
app.use("/api/products", productRoute);
app.use("/api/departments", departmentRoute);
app.use("/api/vendors", vendorRoute);
app.use("/api/customers", customerRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log("Server running");
});
