const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/student/:name", (req, res) => {
  const studentName = req.params.name;

  res.render("student", { name: studentName });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
