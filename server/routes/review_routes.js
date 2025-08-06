const { Create_review, product_review, all_reviews } = require("../Controller/Review_controller");
const { verifyUser } = require("../middleware/verifyToken");

const review_routes = require("express").Router();

review_routes.post("/create",verifyUser,Create_review)

review_routes.get("/get/:id",product_review)

review_routes.get("/allreviews",all_reviews)

module.exports=review_routes;