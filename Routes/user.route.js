import express from 'express'
import {
    Register,
    login,
    verifier,
} from '../Controllers/user.controller.js'
const router = express.Router()

router.route('/')

router.route('/register').post(Register)

router.route('/verify/:token').get(verifier)
router.route('/login').post(login)

export default router
