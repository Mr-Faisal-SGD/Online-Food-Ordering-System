import express from "express";
import cors from "cors";
import { sample_foods } from "./data";
import { sample_tags } from "./data";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:search", (req, res) => {
  const params = req.params.search;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(params.toLowerCase())
  );
  res.send(foods);
});

app.get("/api/foods/tag", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/tag/:search", (req, res) => {
  const params = req.params.search;
  const foods =
    params === "All"
      ? sample_foods
      : sample_foods.filter((food) => food.tags?.includes(params));
  res.send(foods);
});

app.get("/api/foods/food/:foodid", (req, res) => {
  const params = req.params.foodid;
  const food = sample_foods.find((food) => food.id == params);
  res.send(food);
});

const port = 5000;

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
