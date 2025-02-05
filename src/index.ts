import express from 'express';
import pokemonRoutes from "./pokemon/pokemon.router";
import usersRoutes from "./users/users.router";
export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pokemonRoutes);
app.use(usersRoutes);

export const server = app.listen(port);

export function stopServer() {
  server.close();
}