import express from "express"
import cors from "cors"
import "dotenv/config"
import errorHandler from "./src/middleware/ErrorHandler.js"
import { authRoute } from "./src/routes/auth.js"
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
app.get("/healtchecker",(req,res)=>{
    res.json("Heallth checker ")
})
app.use("/api/auth",authRoute)
app.use(errorHandler)
app.listen(PORT,()=>console.log(`Love Connect is listening at ${PORT}`))