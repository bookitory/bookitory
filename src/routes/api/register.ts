import { Member } from '@models/member';
import { NextFunction, Request, Response, Router } from 'express';

const registerRouter = Router();

registerRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body as Member;
    res.json({success: true})
});

export default registerRouter;
