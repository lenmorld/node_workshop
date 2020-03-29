const express = require('express');
const router = express.Router();

// import modules
const dateTimeHelper = require('../utils/dateTimeHelper');

// db setup
const DbConnection = require('../db');

// GET all products
router.get("/products", async (req, res) => {
	const dbCollection = await DbConnection.getCollection("products");
	const products = await dbCollection.find().toArray();
	res.json(products);
});

// GET one product identified by id
router.get("/products/:id", async (req, res) => {
	const productId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("products");
	const product = await dbCollection.findOne({ id: productId });
	res.json(product);
});

// POST (create) a product 
router.post("/products", (req, res) => {
	const product = req.body;
	console.log('Adding new product: ', product);

	if (!product.id) {
		res.json({
			error: "id required"
		})
	} else if (products.find(_product => _product.id === product.id)) {
		res.json({
			error: "Product already exists"
		})
	} else {
		// SUCCESS!
		// add new product to products array
		products.push({
			...product,
			createdAt: dateTimeHelper.getTimeStamp()
		})

		// return updated list
		res.json(products);
	}
});

// PUT (update) a product
router.put("/products/:id", (req, res) => {
	const productId = Number(req.params.id);
	const updatedProduct = req.body;
	console.log("Editing product ", productId, " to be ", updatedProduct);

	const updatedListProducts = [];
	let found = false;

	// loop through list to find and replace one product
	products.forEach(oldProduct => {
		if (oldProduct.id === productId) {
			found = true;
			// spread oldProduct properties
			// then overwrite with product properties
			const modifiedProduct = {
				...oldProduct,
				...updatedProduct
			};
			// updatedListProducts.push(modifiedProduct);
			updatedListProducts.push({
				...modifiedProduct,
				updatedAt: dateTimeHelper.getTimeStamp()
			});
		} else {
			updatedListProducts.push(oldProduct);
		}
	});

	if (!found) {
		res.json({
			error: 'Product not found'
		});
	} else {
		// SUCCESS!!
		// replace old list with new one
		products = updatedListProducts;

		// return updated list
		res.json(products);
	}
});

// DELETE a product
router.delete("/products/:id", (req, res) => {
	const productId = Number(req.params.id);
	console.log("Delete product with id: ", productId);

	// filter list copy, by excluding item to delete
	const filteredList = products.filter(_product => _product.id !== productId);

	if (filteredList.length === products.length) {
		res.json({
			error: 'Product not found'
		})
	} else {
		// SUCCESS!
		products = filteredList;
		res.json(products);
	}
});


module.exports = router; 