import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Rosewater Clay Mask",
    slug: "rosewater-clay-mask",
    description:
      "A pink kaolin clay mask infused with rosewater and centella to draw out impurities without stripping moisture. Sets soft, rinses clean.",
    price: 28,
    compareAtPrice: 34,
    category: "skincare",
    images: [],
    colors: ["#D89AAE", "#F2D9E1"],
    stock: 42,
    rating: 4.7,
    reviewCount: 138,
    isNewUser: false,
    isFeatured: true,
    tags: ["mask", "clay", "rosewater"],
  },
  {
    name: "Peony Silk Serum",
    slug: "peony-silk-serum",
    description:
      "Lightweight facial oil blending peony extract and squalane. Absorbs fast, leaves a satin finish with no greasy residue.",
    price: 46,
    category: "skincare",
    images: [],
    colors: ["#A83B5C"],
    stock: 30,
    rating: 4.9,
    reviewCount: 212,
    isFeatured: true,
    tags: ["serum", "oil", "peony"],
  },
  {
    name: "Blush Linen Throw",
    slug: "blush-linen-throw",
    description:
      "Stonewashed European linen throw in dusty rose, woven with a subtle herringbone texture. Softens more with every wash.",
    price: 68,
    category: "home",
    images: [],
    colors: ["#E8A0B4", "#C9A15A"],
    stock: 18,
    rating: 4.8,
    reviewCount: 64,
    isNewUser: true,
    isFeatured: true,
    tags: ["linen", "throw", "home"],
  },
  {
    name: "Dusk Rose Ceramic Vase",
    slug: "dusk-rose-ceramic-vase",
    description:
      "Hand-thrown stoneware vase glazed in a warm rose finish, each piece kiln-fired with slight variation so no two are identical.",
    price: 54,
    category: "home",
    images: [],
    colors: ["#B85C7A"],
    stock: 12,
    rating: 4.6,
    reviewCount: 41,
    isFeatured: false,
    tags: ["ceramic", "vase", "decor"],
  },
  {
    name: "Fig & Rosewood Candle",
    slug: "fig-rosewood-candle",
    description:
      "Soy-coconut wax candle in fig, rosewood, and warm amber. 45-hour burn in a reusable blush glass vessel.",
    price: 32,
    category: "candles",
    images: [],
    colors: ["#8C4A5C", "#F2D9E1"],
    stock: 55,
    rating: 4.8,
    reviewCount: 176,
    isNewUser: true,
    isFeatured: true,
    tags: ["candle", "fig", "rosewood"],
  },
  {
    name: "Wax Seal Letter Set",
    slug: "wax-seal-letter-set",
    description:
      "Cotton-rag stationery set with a rose-gold wax seal stamp, blush envelopes, and 12 sheets of deckle-edge paper.",
    price: 24,
    category: "stationery",
    images: [],
    colors: ["#C9A15A", "#E8A0B4"],
    stock: 60,
    rating: 4.5,
    reviewCount: 53,
    isFeatured: false,
    tags: ["stationery", "letters", "gift"],
  },
  {
    name: "Rosette Daily Planner",
    slug: "rosette-daily-planner",
    description:
      "Undated hardcover planner with a blush foil-stamped cover, weekly spreads, and a ribbon marker in dusty rose.",
    price: 22,
    category: "stationery",
    images: [],
    colors: ["#A83B5C"],
    stock: 70,
    rating: 4.7,
    reviewCount: 98,
    isFeatured: false,
    tags: ["planner", "stationery"],
  },
  {
    name: "Berry Enamel Hair Clip Set",
    slug: "berry-enamel-hair-clip-set",
    description:
      "Set of three enamel hair clips in berry, blush, and cream, finished with a brushed gold clasp.",
    price: 19,
    category: "accessories",
    images: [],
    colors: ["#A83B5C", "#E8A0B4", "#FBF2F0"],
    stock: 85,
    rating: 4.4,
    reviewCount: 71,
    isNewUser: true,
    isFeatured: false,
    tags: ["hair", "accessories"],
  },
  {
    name: "Rosette Canvas Tote",
    slug: "rosette-canvas-tote",
    description:
      "Heavyweight canvas tote with a hand-drawn rose motif printed in a single berry ink, reinforced rope handles.",
    price: 30,
    category: "accessories",
    images: [],
    colors: ["#FBF2F0", "#A83B5C"],
    stock: 40,
    rating: 4.6,
    reviewCount: 84,
    isFeatured: true,
    tags: ["tote", "bag", "canvas"],
  },
  {
    name: "Velvet Rose Hand Cream",
    slug: "velvet-rose-hand-cream",
    description:
      "Rich shea and rose hip hand cream in a travel-friendly tin. Fast-absorbing, faintly floral, never sticky.",
    price: 14,
    category: "skincare",
    images: [],
    colors: ["#D89AAE"],
    stock: 90,
    rating: 4.5,
    reviewCount: 122,
    isFeatured: false,
    tags: ["hand cream", "skincare"],
  },
  {
    name: "Amber Rose Diffuser",
    slug: "amber-rose-diffuser",
    description:
      "Reed diffuser blending Bulgarian rose, amber, and sandalwood in a matte blush ceramic base. Lasts up to 10 weeks.",
    price: 36,
    category: "home",
    images: [],
    colors: ["#B85C7A", "#C9A15A"],
    stock: 25,
    rating: 4.7,
    reviewCount: 58,
    isFeatured: false,
    tags: ["diffuser", "fragrance", "home"],
  },
  {
    name: "Quartz Pink Jewelry Dish",
    slug: "quartz-pink-jewelry-dish",
    description:
      "Polished rose quartz-finish resin dish for rings and earrings, cast with gentle marbling in every piece.",
    price: 20,
    category: "accessories",
    images: [],
    colors: ["#E8A0B4"],
    stock: 33,
    rating: 4.3,
    reviewCount: 29,
    isNewUser: true,
    isFeatured: false,
    tags: ["jewelry", "dish", "decor"],
  },
];

async function seed() {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rosette";
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB for seeding");

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`Seeded ${products.length} products.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
