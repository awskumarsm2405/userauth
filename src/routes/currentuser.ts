import express, { Express, Router, Request, Response } from "express";
import {authenticateUser, BadRequestError} from '@skmnpm/common';


const router: Router = express.Router();
router.get(
    '/currentuser', 
    authenticateUser,
    async (req: Request, res: Response) => {
        if(!req.currentUser){
            throw new BadRequestError("Invalid request details");
        }
        res.send({"currentUser":req.currentUser});

    }
)
export { router as currentUser}