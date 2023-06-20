import mongoose, { Schema, Model, Document } from "mongoose";

interface CartAttrs {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
}

interface CartModel extends Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc;
}

interface CartDoc extends Document {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
}

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

CartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>(
  "Cart",
  CartSchema
);

export { Cart };
