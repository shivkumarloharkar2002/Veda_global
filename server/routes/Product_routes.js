const { addProduct, updateProduct, allProducts } = require("../Controller/product_controller");
const imageUpload = require("../Service/multer");

const product_routes = require("express").Router();

product_routes.post("/add",imageUpload.array("files",3), addProduct);

product_routes.put("/update/:id",imageUpload.array("files",3), updateProduct);

product_routes.get("/all",allProducts)
module.exports=product_routes;
