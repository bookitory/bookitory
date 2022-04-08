import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { mkdirSync, existsSync, writeFile } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import fetch from 'node-fetch';

import { RequestRegister } from '@models/reqBody';
import { Member } from '@models/member';

const dir = join(__dirname, '..', 'public', 'images', 'uploads');
const APIURL = "http://localhost:3000/api/";

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
    res.render('register');
});

registerRouter.post('/',  upload.single('profile'), (req: Request, res: Response, next: NextFunction) => {
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

        fetch(APIURL + "register", { 
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        }).then(data => {
            console.log("fetch data: ", data)
            res.json(data);
        }).catch(err => {
            next(err);
        })
    } catch (error) {
        next(error);
    }
});

export default registerRouter;
