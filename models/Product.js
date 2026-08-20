import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 }, // original price, for showing a sale strike-through
    category: {
      type: String,
      required: true,
      enum: ["skincare", "home", "stationery", "accessories", "candles"],
    },
    images: { type: [String], default: [] },
    colors: { type: [String], default: [] }, // hex swatches, e.g. "#A83B5C"
    stock: { type: Number, required: true, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isNewUser: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", tags: "text" });

export default mongoose.model("Product", productSchema);
