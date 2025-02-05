import express from 'express';
import {Request, Response} from 'express';
import prisma from "./client";
export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

app.get('/pokemon-cards', (req: Request, res: Response) => {
  res.status(200).send("Liste de tous les Pokemons");
});

app.get('/pokemon-cards/:pokemonCardId', (_req: Request, res: Response) => {
  res.status(200).send(`Affichage pokemon ${_req.params.pokemonCardId}`);
});

app.post('/pokemon-cards', (req: Request, res: Response) => {
  res.status(201).send(`Pokemon ${req.body.name} créé`);
});

app.patch('/pokemon-cards/:pokemonCardId', (_req: Request, res: Response) => {
  res.status(200).send(`Pokemon ${_req.params.pokemonCardId} modifié`);
});

app.delete('/pokemon-cards/:pokemonCardId', (_req: Request, res: Response) => {
  res.status(200).send(`Pokemon ${_req.params.pokemonCardId} supprimé`);
});

