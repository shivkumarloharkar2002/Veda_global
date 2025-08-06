const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    benifits: {
        type: Array,
        required: true
    },
    weight: {
        type: Number,
        min: 0,
    },
    quantity: {
        type: Number,
        min: 0,
    },
    brand: {
        type: String,
        trim: true,
    },
    imageUrl: [String],
}, {
    timestamps: true
  });

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;