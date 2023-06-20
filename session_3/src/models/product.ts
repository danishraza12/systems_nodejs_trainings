import mongoose, { Schema, Model, Document } from "mongoose";

interface ProductAttrs {
  name: string;
  price: string;
  quantity: number;
  categoryId: Schema.Types.ObjectId;
}

interface ProductModel extends Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

interface ProductDoc extends Document {
  name: string;
  price: string;
  quantity: number;
  categoryId: Schema.Types.ObjectId;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 5,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
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

ProductSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  ProductSchema
);

export { Product };
