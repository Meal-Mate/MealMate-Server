import express, { application, json } from 'express'
import mongoose from 'mongoose'
import adminRoutes from './Routes/admin.route.js'
import userRoutes from './Routes/user.route.js'
import restaurantRoutes from './Routes/restaurant.route.js'
import propositionRoutes from './Routes/proposition.route.js'
import restauthRoutes from './Routes/restauth.route.js'
import passport from 'passport'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/restaurant', restaurantRoutes)
app.use('/proposition', propositionRoutes)
app.use('/restpassword', restauthRoutes)
app.use('/uploadrestaurant', express.static('/uploads'))
const hostname = process.env.DEVURL
const port = process.env.PORT || 9095

mongoose.set('debug', true)
mongoose.Promise = global.Promise

mongoose
    .connect('mongodb://127.0.0.1/MealMateDB')
    .then(() => {
        console.log(`Connected to database`)
    })
    .catch((err) => {
        console.log(err)
    })

app.route('/').get((req, res) => res.json(data))

const views = fileURLToPath(import.meta.url)
const __dirname = path.dirname(views)
app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'jade')

//upload image

app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
})
