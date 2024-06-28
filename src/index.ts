import mongoose from 'mongoose';
import {app} from './app';
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        MONGO_URI: string;
        JWT_SECRET: string;
      }
    }
  }
  
(async function(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(process.env.PORT, ()=>{
            console.log(`started listening at port ${process.env.PORT}`);
        })
    }catch(err){
      console.log("mongouri",process.env.MONGO_URI);
      console.log("port",process.env.PORT);
         console.log(err);
        console.log("Error while connecting to mongodbn");
    }
    
})();


