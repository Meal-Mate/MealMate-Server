import express from 'express'
import {
    Register,
    login,
    verifiedUrl,
    verifyUrl,
    addInterest,
    getTopMatches
} from '../Controllers/user.controller.js'
import { checkCurrentUser } from '../middlewares/verifyToken.js'
const router = express.Router()

router.route('/')

router.route('/register').post(Register)

router.route('/verified').get(verifiedUrl)
router.route('/verify/:userId/:uniqueString').get(verifyUrl)
router.route('/login').post(login)
router.route('/addInterest').post(checkCurrentUser, addInterest)
router.route('/getTopMatches').get(checkCurrentUser, getTopMatches)


export default router
