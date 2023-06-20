import express, { Request, Response } from "express";
import { verifyUser } from "../middlewares/jwt";
import { Product } from "../models/product";

const router = express.Router();

router.get("/product", verifyUser, async (req: Request, res: Response) => {
  try {
    const { name, categoryId } = req.body;

    const queryObj: any = {};
    name && (queryObj.name = name);
    categoryId && (queryObj.categoryId = categoryId);

    const product = await Product.find(queryObj);

    const response = {
      status: "Product(s) found!",
      product,
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/product", async (req: Request, res: Response) => {
  try {
    console.log("Add Product enter: ", req.body);
    const { name, price, quantity, categoryId } = req.body;

    const product = await Product.findOne({
      name,
      categoryId,
    });

    console.log("product: ", product);

    if (product) {
      res.status(200).send({
        message: "Product already exists!",
      });
      return;
    }

    const newProduct = {
      name,
      price,
      quantity,
      categoryId,
    };
    const createdProduct = await Product.create(newProduct);

    res.status(201).send({
      message: "Product added!",
      product: createdProduct,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.put("/product", verifyUser, async (req: Request, res: Response) => {
  try {
    const { id, name, price, quantity, categoryId } = req.body;

    const updateObj: any = {};
    name && (updateObj.name = name);
    price && (updateObj.price = price);
    quantity && (updateObj.quantity = quantity);
    categoryId && (updateObj.categoryId = categoryId);

    const updatedProduct = await Product.findByIdAndUpdate(id, updateObj, {
      new: true,
    });

    res.status(200).send({
      message: "Successfully updated product",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.delete("/product", verifyUser, async (req: Request, res: Response) => {
  try {
    console.log("delete product enter", req.body)
    const { id } = req.body;
  
    const deletedProduct = await Product.findByIdAndDelete(id);
  
    res.status(200).send({
      message: "Successfully deleted product!",
      product: deletedProduct,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

export { router as userRouter };
