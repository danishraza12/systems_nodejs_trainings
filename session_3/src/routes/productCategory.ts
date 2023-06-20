import express, { Request, Response } from "express";
import { verifyUser } from "../middlewares/jwt";
import { ProductCategory } from "../models/category";
import { body, query } from "express-validator";
import { requestValidator } from "../middlewares/requestValidator";

const router = express.Router();

router.get(
  "/productCategory",
  verifyUser,
  [query("categoryName").optional().isAlpha()],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      const { categoryName } = req.query;

      const queryObj: any = {};
      categoryName && (queryObj.categoryName = categoryName);

      const productCategory = await ProductCategory.find(queryObj);

      const response = {
        message: "Product Category found!",
        productCategory,
      };
      return res.status(200).send(response);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

router.post(
  "/productCategory",
  [body("categoryName").isAlpha(), body("categoryLevel").isNumeric()],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      console.log("Add Product Category enter: ", req.body);
      const { categoryName, categoryLevel } = req.body;

      const productCat = await ProductCategory.findOne({
        categoryName,
        categoryLevel,
      });

      console.log("productCat: ", productCat);

      if (productCat) {
        return res.status(200).send({
          message: "Product Category already exists!",
        });
      }

      console.log("Adding new product");

      const newProductCat = {
        categoryName,
        categoryLevel,
      };
      const createdProductCat = await ProductCategory.create(newProductCat);

      return res.status(201).send({
        message: "Product Category added!",
        product: createdProductCat,
      });
    } catch (err) {
      return res.status(400).send({
        message: err.message,
      });
    }
  }
);

router.put(
  "/productCategory",
  verifyUser,
  [body("categoryName").isAlpha(), body("categoryLevel").isNumeric()],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      const { id, categoryName, categoryLevel } = req.body;

      const updateObj: any = {};
      categoryName && (updateObj.categoryName = categoryName);
      categoryLevel && (updateObj.categoryLevel = categoryLevel);

      const updatedProductCat = await ProductCategory.findByIdAndUpdate(
        id,
        updateObj,
        {
          new: true,
        }
      );

      return res.status(200).send({
        message: "Successfully updated product category",
        product: updatedProductCat,
      });
    } catch (err) {
      return res.status(400).send({
        message: err.message,
      });
    }
  }
);

router.delete(
  "/productCategory",
  verifyUser,
  async (req: Request, res: Response) => {
    try {
      console.log("delete product category enter", req.body);
      const { id } = req.body;

      const deletedProduct = await ProductCategory.findByIdAndDelete(id);

      return res.status(200).send({
        message: "Successfully deleted product category!",
        product: deletedProduct,
      });
    } catch (err) {
      return res.status(400).send({
        message: err.message,
      });
    }
  }
);

export { router as productCategoryRouter };
