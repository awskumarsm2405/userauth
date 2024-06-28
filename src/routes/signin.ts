import express, { Express, Router, Request, Response } from "express";
import { User, UserDoc } from './../models/User';
import { body, validationResult } from 'express-validator';
import {reqValidation, BadRequestError} from '@skmnpm/common';
import bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
const router: Router = express.Router();
router.post(
    '/signin', 
    [
        body('email').isEmail().notEmpty(),
        body('password').isLength({ min: 5 })
    ],
    reqValidation,
    async (req: Request, res: Response) => {
        const { email, password} = req.body;
        const userObj = await User.findOne({ "email": email});
        if(!userObj){
            console.log("Invalid user credentials");
            throw new BadRequestError("Invalid user credentials");
        }
        const isMatched = await bcrypt.compare(password, userObj.password);
        if(!isMatched){
            console.log("jjjInvalid user credentials");
            throw new BadRequestError("Invalid user credentials");
        }
        req.session = {
            jwt: jwt.sign({ email: userObj.email, id:userObj.id  }, process.env.JWT_SECRET)

        }
        res.status(200).send({"message":"Login successfull", "access_token":req.session.jwt, "user_id":userObj.id});

    }
)
export { router as signinRoute}