import { NextFunction, Request, Response, Router } from 'express';
import { mkdirSync, existsSync, writeFile } from 'fs';
import { join } from 'path';
import multer from 'multer';
import sharp from 'sharp';

import DB from '@models/index';
import { RequestRegister } from '@interfaces/reqBody';
import { Member } from 'src/interfaces/member';

const dir = join(__dirname, '..', 'public', 'images', 'uploads');

const registerRouter = Router();

const _storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        callback(null, dir);
    },
    filename: (req, file, callback) => {
      callback(null, Date.now().valueOf() + "_" + file.originalname);
    }
});

const upload = multer({ storage: _storage }); // upload 미들웨어

registerRouter.get('/', (req: Request, res: Response) => {
    res.render('register', { statusCode: 0 } );
});

registerRouter.post('/',  upload.single('profile'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        sharp(req.file?.path) //파일크기를 압축시킨다
            .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
            .withMetadata() // 이미지의 exif 데이터 유지
            .toBuffer((err, buffer) => {
                if (err) next(err);

                writeFile(req.file?.path!, buffer, (e) => { // 압축된 파일 기존 파일에 덮어씌우기
                    if (e) next(e);
                });
            });

        const reqBody = req.body as RequestRegister;
        const member: Member = { ...reqBody, profile: req.file?.filename! };
        const chkEmail = await DB.member.findOne({ where: { email: member.email} });
        
        if (chkEmail !== null) { // email 중복 확인
            res.render('register', { statusCode: 23000 } );
        } else {

            await DB.member.create({
                email: member.email,
                password: member.password,
                profile: member.profile
            });

            res.render('register', { statusCode: 200 } );
        }
    } catch (error) {
        next(error);
    }
});

export default registerRouter;
