const Product = require("../Model/Product");
const { Review } = require("../Model/review");

exports.Create_review = async (req, res) => {
    const userId = req.user.id; // assuming authentication middleware sets req.user
    const { productId, review, rating } = req.body;

    try {
        const existingReview = await Review.findOne({ userId, productId });

        if (existingReview) {

            existingReview.review = review;
            existingReview.rating = rating;
            await existingReview.save();

            return res.status(200).json({ message: 'Review updated', review: existingReview });
        }

        // Create a new review
        const newReview = new Review({
            userId,
            productId,
            review,
            rating,
        });

        await newReview.save();
        return res.status(201).json({ message: 'Review created', review: newReview });

    } catch (error) {
        console.error("Error ---", error.message);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.product_review = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const reviews = await Review.find({ productId: id }).populate("userId", "firstName lastName"); // make sure 'user' is a ref in schema

        return res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        console.error("Error getting reviews:", error.message);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.all_reviews = async (req, res) => {
    try {

        const reviews = await Review.find()
        .populate("productId","name title")
        .populate("userId", "firstName lastName")
        if (!reviews) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            success: true,
            reviews: reviews
        });
    } catch (error) {
        console.error("Error getting reviews:", error.message);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.deletereview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const deletedreview = await Review.findOneAndDelete({userId:userId,productId:id});

        if (!deletedreview) {
            return res.status(404).json({ message: "deleted review not found" });
        }

        res.status(200).json({ message: "deletedreview deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};