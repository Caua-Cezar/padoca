import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import db from "./src/database/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import perfilRoutes from "./src/routes/perfilRoutes.js";
import produtoRoutes from './src/routes/produtoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use('/produtos', produtoRoutes);

app.set("db", db); // Isso é importante para acessar db via req.app.get("db")

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/auth", authRoutes);
app.use("/perfil", perfilRoutes);

app.listen(3333, "0.0.0.0", () => {
  console.log("API rodando em http://0.0.0.0:3333");
});
