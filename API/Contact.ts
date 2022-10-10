import { Request, Response } from "express";

export async function requestHandler(req: Request, res: Response): Promise<void> {
    const { content, email, name, subject } = req.body;
    void [content, email, name, subject];
    res.sendStatus(200);
}