import mongoose, { Schema, Model, Document } from "mongoose";

interface CheckoutAttrs {
  userId: Schema.Types.ObjectId;
  products: Products[];
  discount: number;
}

interface CheckoutModel extends Model<CheckoutDoc> {
  build(attrs: CheckoutAttrs): CheckoutDoc;
}

interface CheckoutDoc extends Document {
  userId: Schema.Types.ObjectId;
  products: Products[];
  discount: number;
}

interface Products {
  productId: string;
  quantity: number;
  price: number;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { _id: false }
);

const CheckoutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [productSchema],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
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

CheckoutSchema.statics.build = (attrs: CheckoutAttrs) => {
  return new Checkout(attrs);
};

const Checkout = mongoose.model<CheckoutDoc, CheckoutModel>(
  "Checkout",
  CheckoutSchema
);

export { Checkout };
