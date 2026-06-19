const express = require("express");
const cors = require("cors");
const path = require("path");
 
const usuarioRoutes = require("./routes/usuarioRoutes");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
// Disponibiliza os arquivos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));
 
// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});
 
// Rotas da API
app.use("/usuarios", usuarioRoutes);
 
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});