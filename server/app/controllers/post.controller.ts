import { Request, Response } from "express";

export async function getPosts(req:Request,res:Response) {
    res.status(200).json({
        status: true,
        message: "Posts get successfully.",
    })
}