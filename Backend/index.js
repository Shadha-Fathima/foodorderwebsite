import express from 'express'
import { connectDB } from './config/dbConfig.js'
import userRouter from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
// app config
const app = express()
const port = 3000

// database connection
connectDB()



// middleware

app.use(express.json())
app.use(cookieParser())
//app.use(cors())


// api endpoints
app.use('/api/user',userRouter)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})