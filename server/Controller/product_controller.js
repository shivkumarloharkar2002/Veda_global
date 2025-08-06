const Product = require("../Model/Product");


exports.addProduct = async (req, res) => {
  try {
    const { name, category, title, desc, price, benifits, weight, quantity, brand } = req.body;
    // if (req.user.isAdmin) {


    const files = []
    if (req.files && req.files.length > 0) {
      req.files.forEach(data => {
        console.log(data)
        const fileurl = `${req.protocol}://${req.get('host')}/product/${data.filename}`;
        files.push(fileurl)
      });
    }

    let benifitsArray = [];
    try {
      benifitsArray = JSON.parse(benifits); // <-- Parse JSON string
    } catch (e) {
      return res.status(400).json({ message: "Invalid benifits format" });
    }
    const newProduct = await Product.create({
      name,
      title,
      benifits: benifitsArray,
      category,
      price,
      imageUrl: files,
      desc,
      weight,
      quantity,
      brand
    });
    return res.status(200).json({ message: "Product Added SUccessfully", data: newProduct });
    // } else {
    //   return res.status(403).json({ message: "invalid request" });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};


exports.singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json({ product: product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("reviews")
    if (products) {
      return res.status(200).json({ products });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// exports.update_Product = async (req, res) => {
//   const { name, category, title, desc, price, benifits, weight, quantity, brand } = req.body;
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let fileUrl=product.imageUrl;
//     if (req.files) {
//         fileUrl = `${req.protocol}://${req.get('host')}/product/${req.files.filename}`;

//         const oldimage=product.imageUrl.split('/Uploads/')[1];
//         if(oldimage){
//         const imageFilePath = path.join(__dirname, '..', 'Uploads',oldimage );
//         if (fs.existsSync(imageFilePath)) {
//             fs.unlinkSync(imageFilePath);  
//         }
//     }

//         article.img = fileUrl;
//     }



//       const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
//         name,
//         title,
//         // benifits: benifitsArray,
//         category,
//         price,
//         imageUrl: files,
//         desc,
//         weight,
//         quantity,
//         brand
//       }, { new: true });
//       return res.status(200).json({ updatedProduct: updatedProduct });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };


exports.deleteProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await Product.deleteOne(req.params.id);
      return res.status(200).json({ message: "product deleted successfully" });
    } else {
      return res.status(403).json({ message: "invalid request" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};



const fs = require('fs');
const path = require('path');

exports.updateProduct = async (req, res) => {
  const { name, category, title, desc, price, benefits, weight, quantity, brand } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle file uploads
    let fileUrls = product.imageUrl; // Default to existing images
    if (req.files && req.files.length > 0) {
      fileUrls = [];

      // Delete old images
      if (Array.isArray(product.imageUrl)) {
        product.imageUrl.forEach((imgUrl) => {
          console.log("img",imgUrl)
          const fileName = imgUrl.split('/product/')[1];
          const filePath = path.join(__dirname, '..', 'Uploads', fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }

      // Add new uploaded image URLs
      req.files.forEach(file => {
        const fileUrl = `${req.protocol}://${req.get('host')}/product/${file.filename}`;
        fileUrls.push(fileUrl);
      });
    }


    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        title,
        desc,
        price,
        // benefits: benefitsArray,
        weight,
        quantity,
        brand,
        imageUrl: fileUrls
      },
      { new: true }
    );

    return res.status(200).json({ message: "Product updated successfully", updatedProduct });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
