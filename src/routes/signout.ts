import express, { Express, Router, Request, Response } from "express";
const router: Router = express.Router();
router.post(
        '/signout', 
        async (req: Request, res: Response) => {
            req.session = {

            }
            res.status(200).send({});

        }
)
export { router as signupRoute}