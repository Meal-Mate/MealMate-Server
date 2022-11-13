import express from 'express'
import {
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from '../Controllers/restaurant.controller.js'

const router = express.Router()

router.route('/')

router.route('/add').post(addRestaurant)

router.route('/update/:id').patch(updateRestaurant)

router.route('/delete/:id').delete(deleteRestaurant)

export default router
