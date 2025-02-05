import express from "express";
import prisma from "../client";
import { Request, Response } from "express";

/**
 * Récupérer un pokemon par son id
 * @param _req
 * @param res
 */
export const getPokemonCardById = async (_req: express.Request, res: express.Response) => {
    const PokemonCard = await prisma.pokemonCard.findFirst({
        where: {
            id : parseInt(_req.params.pokemonCardId)
        }
    });
    if (!PokemonCard) {
        res.status(404).send("Pokemon not found.");
        return;
    }

    res.status(200).send(PokemonCard);
}

/**
 * Récupérer tous les pokemons
 * @param _req
 * @param res
 */
export const getPokemonCard = async (_req: express.Request, res: express.Response) => {
    const PokemonCard = await prisma.pokemonCard.findMany();
    // Check if there are no pokemons
    if (PokemonCard.length === 0) {
        res.status(200).send("There are no Pokémon.");
        return;
    }

    res.status(200).send(PokemonCard);
}

/**
 * Créer un pokemon
 * @param req
 * @param res
 */
export const createPokemonCard = async (_req: Request, res: Response) => {
    // Get the data from the request
    const { name, typeId, pokedexId, lifePoints, size, weight, imageUrl } = _req.body;

    // Check for required fields
    if (!name || !typeId || !pokedexId || !lifePoints) {
        res.status(400).send("Some fields are missing.");
        return;
    }

    // Check if typeId exists
    const typeExists = await prisma.type.findFirst({ where: { id: typeId } });
    if (!typeExists) {
        res.status(400).send("The provided typeId does not exist.");
        return;
    }

    // Check for duplicate name or pokedexId
    const duplicatePokemon = await prisma.pokemonCard.findFirst({
        where: {
            OR: [{ name }, { pokedexId }]
        }
    });
    if (duplicatePokemon) {
        res.status(400).send("Duplicate data: name or pokedexId already exists.");
        return;
    }

    // Create the pokemon
    const newPokemonCard = await prisma.pokemonCard.create({
        data: { name, typeId, pokedexId, lifePoints, size, weight, imageUrl },
    });
    res.status(201).json(newPokemonCard);
};

/**
 * Modifier un pokemon
 * @param _req
 * @param res
 */
export const editPokemonCard = async (_req: Request, res: Response) => {
    // Check if the pokemon exists
    const existingPokemonCard = await prisma.pokemonCard.findFirst({
        where: { id: parseInt(_req.params.pokemonCardId) },
    });
    if (!existingPokemonCard) {
        res.status(404).send("Pokemon not found.");
        return;
    }

    // Get the data from the request
    const { name, typeId, pokedexId, lifePoints, size, weight, imageUrl } = _req.body;

    // Check for required fields
    if (!name || !typeId || !pokedexId || !lifePoints) {
        res.status(400).send("Some fields are missing.");
        return;
    }

    // Check if typeId exists
    const typeExists = await prisma.type.findFirst({ where: { id: typeId } });
    if (!typeExists) {
        res.status(400).send("The provided typeId does not exist.");
        return;
    }

    // Check for duplicate name or pokedexId
    const duplicatePokemon = await prisma.pokemonCard.findFirst({
        where: {
            OR: [{ name }, { pokedexId }],
            NOT: { id: parseInt(_req.params.pokemonCardId) }
        }
    });
    if (duplicatePokemon) {
        res.status(400).send("Duplicate data: name or pokedexId already exists.");
        return;
    }

    // Update the pokemon
    const updatedPokemonCard = await prisma.pokemonCard.update({
        where: { id: parseInt(_req.params.pokemonCardId) },
        data: { name, typeId, pokedexId, lifePoints, size, weight, imageUrl },
    });
    res.status(200).json(updatedPokemonCard);
}

/**
 * Delete a pokemon
 * @param _req
 * @param res
 */
export const deletePokemonCard = async (_req: Request, res: Response) => {
    // Check if the pokemon exists
    const existingPokemonCard = await prisma.pokemonCard.findFirst({
        where: { id: parseInt(_req.params.pokemonCardId) },
    });
    if (!existingPokemonCard) {
        res.status(404).send("Pokemon not found.");
        return;
    }

    // Delete the pokemon
    const deletedPokemonCard = await prisma.pokemonCard.delete({
        where: { id: parseInt(_req.params.pokemonCardId) },
    });
    res.status(200).json(deletedPokemonCard);
}