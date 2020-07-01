const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
	id: Number,
	name: String,
	picture: String,
	price: String,
	updatedAt: Date,
	createdAt: Date,
});

module.exports = mongoose.model('Food', FoodSchema);