import express from "express";
import Products from "./products.model.js";
import Reviews from "./../reviews/reviews.model.js";
import verifyToken from "./../middleware/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
const router = express.Router();

//post a production
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });
    const savedProduct = await newProduct.save();
    //calculate reviews
    const reviews = await Reviews.find({ productId: savedProduct._id }); //if error change back to .id instead of ._id(used _id because of mongodb but .json i have been using .id so if issue persists you know what you are doing)
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }
    res.status(200).send(savedProduct);
  } catch (err) {
    console.error("error creating new product", err);
    res.status(500).send({ message: "Failed to create new product" });
  }
});

router.get("/", async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (color && color !== "all") {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    
    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.status(200).send({ products, totalPages, totalProducts });
  } catch (err) {
    console.error("Error Fetching products", err);
    res.status(500).send({ message: "Error fetching products" });
  }
});

//get a single product by id
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate(
      "author",
      "email username"
    );
    if (!product) return res.status(404).send({ message: "Product not found" });
    const reviews = await Reviews.find({ productId }).populate(
      "userId",
      "username email"
    );
    res.status(200).send({ product, reviews });
  } catch (err) {
    console.error("Error Fetching products", err);
    res.status(500).send({ message: "Failed to fetch product" });
  }
});

//update a product
router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating the product", error);
    res.status(500).send({ message: "Failed to update the product" });
  }
});

//delete a product
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);
    if (!deletedProduct)
      return res.stata(404).send({ message: "Product not found" });
    await Reviews.deleteMany({ productId: productId });
    res.status(200).send({ message: "Product Deleted Successfully" });
  } catch (err) {
    console.error("Error Deleting Product", err);
    res.status(500).send({ message: "Failed to delete the product" });
  }
});

router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) return res.stata(400).send({ message: "Product Id not Found" });
    const product = await Products.findById(id);
    if (!product) return res.status(400).send({ message: "Product not found" });
    const titelRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );
    const relatedProducts = await Products.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titelRegex } }, { category: product.category }],
    });
    res.status(200).send(relatedProducts);
  } catch (err) {
    console.error("Error fetching the related products", err);
    res.status(500).send({ message: "Failed to fetch related products" });
  }
});
export default router;
