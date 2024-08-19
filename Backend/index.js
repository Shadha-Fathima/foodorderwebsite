import express from 'express'
import { connectDB } from './config/dbConfig.js'
import userRouter from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import restaurantRoute from './routes/restaurantRoute.js'
import adminRoute from './routes/adminRoute.js'
import foodRoute from './routes/foodRoute.js'
import orderRoute from './routes/orderRoute.js'
import couponRoute from './routes/couponRoute.js'
import cartRoute from './routes/cartRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import ratingRoute from './routes/ratingRoute.js'

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
app.use('/api/restaurant',restaurantRoute)
app.use('/api/admin',adminRoute)
app.use('/api/food',foodRoute)
app.use('/api/order',orderRoute)
app.use('/api/coupon',couponRoute)
app.use('/api/cart',cartRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/rating',ratingRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})