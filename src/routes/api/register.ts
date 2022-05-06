import { Member } from 'src/interfaces/member';
import DB from '@models/index';
import { NextFunction, Request, Response, Router } from 'express';

const registerRouter = Router();

registerRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body as Member;

    try {
        const chkEmail = await DB.member.findOne({ where: { email: reqBody.email} });
        if (chkEmail !== null) { // email 중복 확인
            res.json({ status: `Duplicate entry '${reqBody.email}' for key 'member.PRIMARY'`, statusCode: 23000});
        }

        await DB.member.create({
            email: reqBody.email,
            password: reqBody.password,
            profile: reqBody.profile
        });

        res.json({ status: 'Create Member Success', statusCode: 200 });
    } catch (error) {
        res.json({ status: 'Something Broken!', statusCode: 500 });
    }
});

export default registerRouter;
