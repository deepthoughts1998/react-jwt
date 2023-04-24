import express from "express"
import auth from "./routes/auth.js"
import cors from "cors"
const app=express()

app.use(express.json())
app.use(cors())

app.use("/auth",auth)


app.listen(3001,()=>{
    console.log("listening on port 3001")
})