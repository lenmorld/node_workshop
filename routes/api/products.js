const express = require('express');
const router = express.Router();

// import modules
const dateTimeHelper = require('../../utils/dateTimeHelper');

// db setup
const DbConnection = require('../../db');

// custom Logger middleware
router.use(function (req, res, next) {
	console.log(`### [* Logger] Request received to ${req.path} at ${(new Date()).toISOString()}`)
	next()
})

// custom Logger middleware 2
router.use("/products/:id", function (req, res, next) {
	console.log(`### [/products/:id Logger] Request received to get a product at ${(new Date()).toISOString()}`)
	next()
})

router.use(function (req, res, next) {
	console.log(`### [Logger] 1`)
	next()
})

// GET all products
router.get("/products", async (req, res) => {
	const dbCollection = await DbConnection.getCollection("products");
	const products = await dbCollection.find().toArray();
	res.json(products);
});

router.use(function (req, res, next) {
	console.log(`### [Logger] 2`)
	next()
})

// GET one product identified by id
router.get("/products/:id", async (req, res) => {
	const productId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("products");
	const product = await dbCollection.findOne({ id: productId });
	res.json(product);
});

// POST (create) a product 
router.post("/products", async (req, res) => {
	const newProduct = req.body;
	console.log('Adding new product: ', newProduct);

	if (!newProduct.id) {
		res.json({
			error: "id required"
		})
	}

	const dbCollection = await DbConnection.getCollection("products");
	const product = await dbCollection.findOne({ id: newProduct.id });

	if (product) {
		res.json({
			error: "Product with given id already exists"
		})
	} else {
		await dbCollection.insertOne({
			...newProduct,
			createdAt: dateTimeHelper.getTimeStamp()
		});

		// return updated list
		const products = await dbCollection.find().toArray();
		res.json(products);
	}
});

// PUT (update) a product
router.put("/products/:id", async (req, res) => {
	const productId = Number(req.params.id);
	const updatedProduct = req.body;
	console.log("Editing product ", productId, " to be ", updatedProduct);

	const dbCollection = await DbConnection.getCollection("products");
	const product = await dbCollection.findOne({ id: productId });

	if (!product) {
		res.json({
			error: "Product with given id doesn't exist"
		})
	} else {
		updatedProduct.updatedAt = dateTimeHelper.getTimeStamp();
		await dbCollection.updateOne({ id: productId }, { $set: updatedProduct });

		// return updated list
		const products = await dbCollection.find().toArray();
		res.json(products);
	}
});

// DELETE a product
router.delete("/products/:id", async (req, res) => {
	const productId = Number(req.params.id);
	console.log("Delete product with id: ", productId);

	const dbCollection = await DbConnection.getCollection("products");
	const product = await dbCollection.findOne({ id: productId });

	if (!product) {
		res.json({
			error: "Product with given id doesn't exist"
		})
	} else {
		await dbCollection.deleteOne({ id: productId });

		// return updated list
		const products = await dbCollection.find().toArray();
		res.json(products);
	}
});


module.exports = router; 