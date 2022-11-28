import express, { application, json } from 'express'
import mongoose from 'mongoose'

import adminRoutes from './Routes/admin.route.js'
import userRoutes from './Routes/user.route.js'
import restaurantRoutes from './Routes/restaurant.route.js'
import propositionRoutes from './Routes/proposition.route.js'
import restauthRoutes from './Routes/restauth.route.js'
import passport from 'passport'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import path from 'path'

const app = express()
app.use(express.json())

const hostname = '127.0.0.1'
const port = process.env.PORT || 9095

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/restaurant', restaurantRoutes)
app.use('/proposition', propositionRoutes)
app.use('/restpassword', restauthRoutes)
mongoose.connect('mongodb://127.0.0.1/MealMateDB')

const views = fileURLToPath(import.meta.url)
const __dirname = path.dirname(views)
app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'jade')

const connection = mongoose.connection
connection.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('MongoDb connected')
})

app.route('/').get((req, res) => res.json(data))

app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
})
