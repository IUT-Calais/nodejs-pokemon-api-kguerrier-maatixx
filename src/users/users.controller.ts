import express from "express";
import prisma from "../client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Create a user
 * @param req
 * @param res
 */
export const createUser = async (req: Request, res: Response) => {
    // Get the data from the request
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
        res.status(400).send("Some fields are missing.");
        return;
    }

    // Check if the user already exists
    const userExists = await prisma.user.findFirst({ where: { email } });
    if (userExists) {
        res.status(400).send("User already exists.");
        return;
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    res.status(201).send(user);
}

/**
 * Connect a user
 * @param req
 * @param res
 */
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
        res.status(400).send("Some fields are missing.");
        return;
    }

    // Check if the user exists
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        res.status(404).send("User not found.");
        return;
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).send("Invalid password.");
        return;
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN as string }
    );

    res.status(201).json({ token });
}