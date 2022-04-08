import { Router } from 'express';
import registerRouter from '@api/register';

const apiRouter = Router();

apiRouter.use('/register', registerRouter);

export default apiRouter;
