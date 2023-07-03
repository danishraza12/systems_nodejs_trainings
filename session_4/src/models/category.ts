import mongoose, { Schema, Model, Document } from "mongoose";

interface ProductCategoryAttrs {
  categoryName: string;
  categoryLevel: number;
}

interface ProductCategoryModel extends Model<ProductCategoryDoc> {
  build(attrs: ProductCategoryAttrs): ProductCategoryDoc;
}

interface ProductCategoryDoc extends Document {
  categoryName: string;
  categoryLevel: number;
}

const ProductCategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryLevel: {
      type: Number,
      default: 3,
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

ProductCategorySchema.statics.build = (attrs: ProductCategoryAttrs) => {
  return new ProductCategory(attrs);
};

const ProductCategory = mongoose.model<ProductCategoryDoc, ProductCategoryModel>(
  "ProductCategory",
  ProductCategorySchema
);

export { ProductCategory };
