import { Router } from 'express';
import {createPokemonCard, deletePokemonCard, editPokemonCard, getPokemonCardById} from "./pokemon.controller";
import {getPokemonCard} from "./pokemon.controller";
import {verifyJWT} from "../common/jwt.middleware";

const router = Router();

// Route to get all pokemons
router.get('/pokemon-cards', getPokemonCard);

// Route to get a pokemon by id
router.get('/pokemon-cards/:pokemonCardId', getPokemonCardById);

// Route to create a pokemon
router.post('/pokemon-cards', verifyJWT, createPokemonCard);

// Route to edit a pokemon
router.patch('/pokemon-cards/:pokemonCardId', verifyJWT, editPokemonCard);

// Route to delete a pokemon
router.delete('/pokemon-cards/:pokemonCardId', verifyJWT, deletePokemonCard);

export default router;