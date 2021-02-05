import express from "express";
import path from "path";
import { conversao, toMoney } from "./lib/convert.js";
import { getCotacao, getCotacaoAPI, extractCotacao } from "./lib/bcb.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(path.dirname("."), "views"));

app.use(express.static(path.join(path.dirname("."), "public")));

app.get("/", async (req, res) => {
  const cotacao = await getCotacao();
  res.render("home", {
    cotacao,
  });
});

app.get("/cotacao", (req, res) => {
  const { cotacao, quantidade } = req.query;

  if (cotacao > 0 && quantidade > 0) {
    const valorConvertido = toMoney(conversao(cotacao, quantidade));
    res.render("cotacao", {
      valorConvertido: valorConvertido,
      quantidade: toMoney(quantidade),
      cotacao: toMoney(cotacao),
      error: false,
    });
  } else {
    res.render("cotacao", {
      error: "Valores inválidos",
    });
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Não foi possível iniciar");
  } else {
    console.log("ConvertMyMoney está online");
  }
});
