import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("Seed Is Done!");
  })
);

router.get(
  "",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

router.get(
  "/search/:search",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.search, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  "/tag",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get("/tag/:search", (req, res) => {
  const params = req.params.search;
  const foods =
    params === "All"
      ? sample_foods
      : sample_foods.filter((food) => food.tags?.includes(params));
  res.send(foods);
});

router.get(
  "/food/:foodid",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodid);
    res.send(food);
  })
);

export default router;
