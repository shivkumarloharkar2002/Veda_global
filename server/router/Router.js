const express =require("express")
const userroutes = require("../routes/user_routes")
const product_routes = require("../routes/Product_routes")
const review_routes = require("../routes/review_routes")
const Allrouters = express.Router() 

Allrouters.use("/user",userroutes)

Allrouters.use("/product",product_routes)

Allrouters.use("/review",review_routes)

module.exports = Allrouters;