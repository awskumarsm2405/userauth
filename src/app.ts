import express, {Express, NextFunction, Request, Response} from "express";
import json from "body-parser";
import 'dotenv/config'
import 'express-async-errors';
import cors from 'cors';
import { errorhandler, NotFoundError } from "@skmnpm/common";
import { signinRoute } from "./routes/signin";
import { signupRoute } from "./routes/signup";
import cookieSession from "cookie-session";
import { currentUser } from "./routes/currentuser";
const app: Express = express();
app.use(json());
app.use((req: Request, res: Response, next: NextFunction) => {
  next();
}, cors({ maxAge: 84600 }));

app.use(cookieSession({
    name: 'session',
    signed: false,
    secure: false
  }))

  
app.use("/auth", signinRoute);
app.use("/auth", signupRoute);
app.use("/auth", currentUser)


app.all("*", async (req: Request, res: Response)=>{
    throw new NotFoundError("Invalid Request");
});
app.use(errorhandler);
export {app}