import { Router } from 'express';
import {createPokemonCard, deletePokemonCard, editPokemonCard, getPokemonCardById} from "./pokemon.controller";
import {getPokemonCard} from "./pokemon.controller";

const router = Router();

// Route pour récupérer tous les pokémons
router.get('/pokemon-cards', getPokemonCard);

// Route pour récupérer un pokémon avec un ID
router.get('/pokemon-cards/:pokemonCardId', getPokemonCardById);

// Route pour créer un pokémon
router.post('/pokemon-cards', createPokemonCard);

// Route pour modifier un pokémon
router.patch('/pokemon-cards/:pokemonCardId', editPokemonCard);

// Route pour supprimer un pokémon
router.delete('/pokemon-cards/:pokemonCardId', deletePokemonCard);

export default router;