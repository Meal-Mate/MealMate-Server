import express from 'express'; 
import {  Register,login,verifiedUrl,verifyUrl } from '../Controllers/user.controller.js';
const router = express.Router(); 




router.route('/')

router.route('/register').post(
    Register)

router.route('verifiedUrl').get(verifiedUrl)
router.route('verifyUrl/:userId/:uniqueString').get(verifyUrl)
router.route('/login').post(login)

export default router ; 