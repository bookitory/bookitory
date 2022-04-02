import path from 'path';

import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import registerRouter from "@routes/register";
import logger from 'jet-logger';
import { CustomError } from '@shared/errors';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

/***********************************************************************************
 *                        Register routes and error handling
 **********************************************************************************/
// Add api router
app.use('/register', registerRouter);

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});

/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/

// Set views engine
 app.set("view engine", "pug");

// Set views dir
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static dir
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

export default app;