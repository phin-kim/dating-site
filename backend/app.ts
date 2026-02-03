import express from "express"
import cors from "cors"
import "dotenv/config"
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
app.get("/healtchecker",(req,res)=>{
    res.json("Heallth checker ")
})
app.listen(PORT,()=>console.log(`Love Connect is listening at ${PORT}`))