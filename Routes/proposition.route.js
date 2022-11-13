import express from 'express'
import {
    addProposition,
    updateProposition,
    deleteProposition,
} from '../Controllers/proposition.controller.js'

const router = express.Router()

router.route('/')

router.route('/add').post(addProposition)

router.route('/update/:id').patch(updateProposition)

router.route('/delete/:id').delete(deleteProposition)

export default router
