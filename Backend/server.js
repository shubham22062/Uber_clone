import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import connectToDb from './src/db/index.js';
const port = process.env.PORT || 3000;

const server = http.createServer(app);

connectToDb().then(()=>{
    server.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });
}) .catch((err)=>{
    console.log("Failed to connect to db",err)

})

