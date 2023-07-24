const express = require("express");
const cors = require("cors");
// const { readFile } = require("fs/promises");

const BlogsController = require("./blogsController");

const port = 5001;
const app = express();

// use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hi, this is express server created by JunYing.");
});

// Get all blogs
app.get("/api/blogs", async (req, res) => {
  const allMdText = await BlogsController.readAllMarkdown();
  res.json(allMdText);
});

// Get specific date blogs
app.get("/api/blogs/:date", async (req, res) => {
  var { date } = req.params;
  console.log(`${date}.md`);
  const mdText = await BlogsController.readOneMarkdown(`${date}.md`);
  res.json(mdText);
});
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
