import express from "express";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(path.dirname("."), "views"));

app.use(express.static(path.join(path.dirname("."), 'public')))

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Não foi possível iniciar");
  } else {
    console.log("ConvertMyMoney está online");
  }
});
