import dotenv from 'dotenv';
import express from 'express';
import connectdb from './config/db.js';
import router from './routes/routes.js';


dotenv.config()

const app= express()

app.use(express.json())

app.use("/api/auth",router)


connectdb()
const PORT = process.env.PORT ||5000

app.get("/",(req,resp)=>{
    resp.send("server runing")
})

app.listen(5000,()=>{
console.log(`server running at ${PORT} `);

})