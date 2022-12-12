import express from 'express'
import { add,getAllMenus, getMenu,getMenuByRestaurant} from '../Controllers/menu.controller.js'
const router = express.Router()

router.route('/')

router.route('/add').post(add)

router.route('/getAll').get(getAllMenus)
router.route('/getMenu/:id').get(getMenu)
router.route('/getAllByRestaurant/:id').get(getMenuByRestaurant)

export default router
