import express, { type Request, type Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db'
import userRouter from '../src/routers/user-router'
import cookieParser from 'cookie-parser'
import productRouter from "./routers/product-route"

dotenv.config()
const app = express()
const port =process.env.PORT || 5000
//const url =process.env.MONGO_URL || "mongodb://localhost:27017/amar_Shop"
const url =process.env.MONGO_URL || "mongodb+srv://hossensadek726_db_user:OpkdebStYqcw021u@cluster0.y9krcxj.mongodb.net/?appName=Cluster0"
connectDb(url)

console.log("database connected",url)
// medlwer
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser())

// all routers
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)




app.get("/", (req:Request,res:Response)=>{
    res.send("This is root page")
})


app.listen(port,()=>{
    console.log(`server running from http://localhost:${port}`)
})

