import express from 'express';
import pokemonRoutes from "./pokemon/pokemon.router";
export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pokemonRoutes);

export const server = app.listen(port);

export function stopServer() {
  server.close();
}