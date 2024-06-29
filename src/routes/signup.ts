import express, { Express, Router, Request, Response } from "express";
import { User, UserDoc } from './../models/User';
import { body, validationResult } from 'express-validator';
import {reqValidation} from '@skmnpm/common';
import * as jwt from "jsonwebtoken";

const router: Router = express.Router();
router.post(
    '/signup', 
    [
        body('email').isEmail().notEmpty(),
        body('name').notEmpty().withMessage("name is required"),
        body('password').isLength({ min: 5 })
    ],
    reqValidation,
    async (req: Request, res: Response) => {
        const { email, password, name, mobile} = req.body;
        const userObj = User.build({ email, password, name, mobile});
        const savedData = await userObj.save();
        if(!process.env.JWT_SECRET){
            throw new Error("Something went wrong");
        }
        req.session = {
            jwt: jwt.sign({ email: userObj.email, id:userObj.id  }, process.env.JWT_SECRET)
        }
        
        return res.status(201).send({"message":"Signup successfull", "access_token":req.session.jwt, "user_id":userObj.id});


    }
)
export { router as signupRoute}