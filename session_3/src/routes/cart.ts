import express, { Request, Response } from "express";
import { verifyUser } from "../middlewares/jwt";
import { Cart } from "../models/cart";
import { body, query } from "express-validator";
import { requestValidator } from "../middlewares/requestValidator";

const router = express.Router();

router.get(
  "/cart",
  verifyUser,
  [],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.currentUser;

      const queryObj: any = {};
      userId && (queryObj.userId = userId);

      const cart = await Cart.find(queryObj).populate({
        path: "productId",
      });

      const response = {
        message: "Items fetched!",
        cart,
      };
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

router.post(
  "/cart",
  verifyUser,
  [
    body("productId").isString(),
    body("quantity").isNumeric(),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      console.log("Add Product enter: ", req.body);
      const { userId } = req.currentUser;

      const { productId, quantity } = req.body;

      const cart = await Cart.findOne({
        userId, productId
      });

      console.log("cart: ", cart);

      if (cart) {
        res.status(200).send({
          message: "Item already added in cart!",
        });
        return;
      }

      const newItem = {
        userId, productId, quantity
      };
      const createdItem = await Cart.create(newItem);

      res.status(201).send({
        message: "Item added!",
        item: createdItem,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

router.put(
  "/cart",
  verifyUser,
  [
    body("id").isString(),
    body("quantity").isNumeric(),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      const { id, quantity } = req.body;

      const updateObj: any = {};
      quantity && (updateObj.quantity = quantity);

      const updatedItem = await Cart.findByIdAndUpdate(id, updateObj, {
        new: true,
      });

      res.status(200).send({
        message: "Successfully updated item",
        cart: updatedItem,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

router.delete(
  "/cart",
  verifyUser,
  [body("id").isString()],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      console.log("delete cart item enter", req.body);
      const { id } = req.body;

      const deletedItem = await Cart.findByIdAndDelete(id);

      res.status(200).send({
        message: "Successfully removed item!",
        product: deletedItem,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

export { router as cartRouter };
