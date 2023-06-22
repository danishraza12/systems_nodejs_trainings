import express, { Request, Response } from "express";
import { verifyUser } from "../middlewares/jwt";
import { Checkout } from "../models/checkout";
import { body, query } from "express-validator";
import { requestValidator } from "../middlewares/requestValidator";

const router = express.Router();

router.get(
  "/checkout",
  verifyUser,
  [
    query("orderId").isString().withMessage("Please provide valid order ID")
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      const { orderId } = req.body;

      const order = await Checkout.findById(orderId).populate({
        path: "userId",
      });

      const response = {
        message: "Order fetched!",
        order,
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
  "/checkout",
  verifyUser,
  [
    body("products").isArray(),
    body("discount").isNumeric(),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      console.log("Add Product enter: ", req.body);
      const { userId } = req.currentUser;

      const { products, discount } = req.body;

      const newOrder = {
        userId, products, discount
      };

      const createdOrder = await Checkout.create(newOrder);

      res.status(201).send({
        message: "Order added!",
        order: createdOrder,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

// router.put(
//   "/checkout",
//   verifyUser,
//   [
//     body("id").isString(),
//     body("quantity").isNumeric(),
//   ],
//   requestValidator,
//   async (req: Request, res: Response) => {
//     try {
//       const { id, quantity } = req.body;

//       const updateObj: any = {};
//       quantity && (updateObj.quantity = quantity);

//       const updatedItem = await Checkout.findByIdAndUpdate(id, updateObj, {
//         new: true,
//       });

//       res.status(200).send({
//         message: "Successfully updated item",
//         cart: updatedItem,
//       });
//     } catch (err) {
//       res.status(400).send({
//         message: err.message,
//       });
//     }
//   }
// );

router.delete(
  "/checkout",
  verifyUser,
  [body("id").isString()],
  requestValidator,
  async (req: Request, res: Response) => {
    try {
      console.log("delete order", req.body);
      const { id } = req.body;

      const deletedOrder = await Checkout.findByIdAndDelete(id);

      res.status(200).send({
        message: "Successfully removed order!",
        product: deletedOrder,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

export { router as checkoutRouter };
