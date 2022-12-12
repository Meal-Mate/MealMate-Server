import express from 'express'
import {
    addProposition,
    updateProposition,
    deleteProposition,
    getProposition,
    getAllProposition
} from '../Controllers/proposition.controller.js'

const router = express.Router()

router.route('/')

router.route('/add').post(addProposition)

router.route('/update/:id').patch(updateProposition)

router.route('/delete/:id').delete(deleteProposition)
router.route('/getOne/:id').get(getProposition)
router.route('/getAll').get(getAllProposition)
export default router
