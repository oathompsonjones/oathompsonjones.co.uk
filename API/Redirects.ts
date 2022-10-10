import { Request, Response } from "express";

export default [
    { handler: (_req: Request, res: Response): void => void res.redirect("mailto:oathompsonjones@gmail.com"), route: "/email" },
    { handler: (_req: Request, res: Response): void => void res.redirect("https://discord.com/users/310145094684639235"), route: "/discord" },
    { handler: (_req: Request, res: Response): void => void res.redirect("https://facebook.com/oathompsonjones"), route: "/facebook" },
    { handler: (_req: Request, res: Response): void => void res.redirect("https://github.com/oathompsonjones"), route: "/github" },
    { handler: (_req: Request, res: Response): void => void res.redirect("https://instagram.com/oathompsonjones"), route: "/instagram" },
    { handler: (_req: Request, res: Response): void => void res.redirect("https://linkedin.com/in/oathompsonjones"), route: "/linkedin" },
    { handler: (_req: Request, res: Response): void => void res.redirect("https://twitter.com/oathompsonjones"), route: "/twitter" }
];