import express from "express";
import { readFile } from "fs/promises";

const app = express();


// Route pour obtenir tous les films (optionnellement filtré par année)
// Exemples : /api/filmes  ou  /api/filmes?annee=2010
app.get("/api/filmes", async (req, res) => {
  const data = await readFile("./data/filmes.json", "utf-8");
  const filmes = JSON.parse(data);

  if (req.query.annee) {
    const annee = parseInt(req.query.annee);
    const filmsByYear = filmes.filter(f => f.annee === annee);
    return res.json(filmsByYear);
  }

  res.status(200).json(filmes);
});

app.get("/api/filmes?annee=:annee", async (req, res) => {
  const data = await readFile("./data/filmes.json", "utf-8");
  const filmes = JSON.parse(data);
  const annee = parseInt(req.params.annee);
  const filmsByYear = filmes.filter(f => f.annee === annee);
  res.json(filmsByYear);
});


app.get("/api/filmes/:id", async (req, res) => {
    const data = await readFile("./data/filmes.json", "utf-8");
    const filmes = JSON.parse(data);
    const filme = filmes.find(f => f.id === parseInt(req.params.id));
    if (filme) {
        res.json(filme);
    } else {
        res.status(404).json({ error: "Film not found" });
    }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
