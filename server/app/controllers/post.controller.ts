import { Request, Response } from "express";

export async function getPosts(req:Request,res:Response) {
    res.status(200).json({
        status: true,
        message: "Posts get successfully.",
    })
}

export async function createPost (req:Request, res:Response) {
    res.status(201).json({
        status: true,
        message: "Post created successfully.",
    })
}