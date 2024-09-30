import financialRecordRouter  from "./routes/financial-records"
import express,{Express} from 'express'
import mongoose from 'mongoose'

const app:Express = express();
const port = process.env.PORT || 3001;


app.use(express.json())

const mongoURI:string = "mongodb+srv://amanshetty300:eHJeMTk1gYuJuQp8@cluster0.7pxrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err)) 

app.use("financial-records",financialRecordRouter)
app.listen(port,()=>{
    console.log(`server running on the port ${port}`)
})