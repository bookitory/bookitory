import { NextFunction, Request, Response, Router } from 'express';

const registerRouter = Router();

registerRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render("register");
});

export default registerRouter;
