import User from '../models/user.model.js'
import UserVerification from '../models/UserVerification.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import middleware from '../middlewares/jwToken.js'
import bcrypt from 'bcrypt'

import path from 'path'

import { v4 as uuidv4 } from 'uuid'
import {} from 'dotenv/config'

let transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
})

export function verifyUrl(req, res) {
    let { userId, uniqueString } = req.params
    UserVerification.find({ userId })
        .then((result) => {
            if (result.length > 0) {
                const { expiresAt } = result[0]
                const hashedUniqueString = result[0].uniqueString
                if (expiresAt < Date.now()) {
                    UserVerification.deleteOne({ userId })
                        .then((result) => {
                            User.deleteOne({ _id: userId })
                                .then(() => {
                                    let message = 'link expired'
                                    res.redirect(
                                        `/user/verified/error=true&message=${message}`
                                    )
                                })
                                .catch((error) => {
                                    let message = 'clearing failed'
                                    res.redirect(
                                        `/user/verified/error=true&message=${message}`
                                    )
                                })
                        })
                        .catch((error) => {
                            console.log(error)
                            let message = 'error'
                            res.redirect(
                                `/user/verified/error=true&message=${message}`
                            )
                        })
                } else {
                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then((result) => {
                            if (result) {
                                User.updateOne(
                                    { _id: userId },
                                    { verified: true }
                                )
                                    .then(() => {
                                        User.deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(
                                                    path.join(
                                                        __dirname,
                                                        '../Views/verified.html'
                                                    )
                                                )
                                            })
                                            .catch((error) => {
                                                let message =
                                                    'kenet bech ta5tef '
                                                res.redirect(
                                                    `/user/verified/error=true&message=${message}`
                                                )
                                            })
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        let message = 'Error '
                                        res.redirect(
                                            `/user/verified/error=true&message=${message}`
                                        )
                                    })
                            } else {
                                let message = 'invalid '
                                res.redirect(
                                    `/user/verified/error=true&message=${message}`
                                )
                            }
                        })
                        .catch((error) => {
                            let message = 'error jena '
                            res.redirect(
                                `/user/verified/error=true&message=${message}`
                            )
                        })
                }
            } else {
                let message = 'ya activitou ya mech mawjoud sorry pal '
                res.redirect(`/user/verified/error=true&message=${message}`)
            }
        })
        .catch((error) => {
            console.log(error)
            let message = 'error'
            res.redirect(`/user/verified/error=true&message=${message}`)
        })
}

export function verifiedUrl(req, res) {
    res.sendFile(path.join(__dirname, '../Views/verified.html'))
}

export function Register(req, res) {
    const { email } = req.body

    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        sexe: req.body.sexe,
    })

    newuser
        .save()
        .then(() => {
            const token = jwt.sign(
                { newuser },
                config.key /*{ expiresIn: ONE_WEEK }*/
            )
            const url = `http://localhost:9095/api/verify/${token}`
            transporter.sendMail({
                to: email,
                subject: 'Verify Account',
                html: `Click <a href = '${url}'>here</a> to confirm your email.`,
            })
            res.status(201).send({
                message: `Sent a verification email to ${email}`,
            })
        })
        .catch((err) => {
            res.status(403).json({ msg: err })
        })
}

export function login(req, res) {
    const email = req.body.email
    const password = req.body.password

    const query = { email }
    //Check the admin exists
    User.findOne(query, (err, user) => {
        //Error during exuting the query
        if (err) {
            return res.send({
                success: false,
                message: 'Error, please try again',
            })
        }

        //No admin match the search condition
        if (!user) {
            return res.send({
                success: false,
                message: 'Error, Account not found',
            })
        }

        //Check if the password is correct
        user.isPasswordMatch(password, user.password, (err, isMatch) => {
            //Invalid password
            if (!isMatch) {
                return res.send({
                    success: false,
                    message: 'Error, Invalid Password',
                })
            }

            //admin is Valid

            //const ONE_WEEK = 604800; //Token validtity in seconds

            //Generating the token
            const token = jwt.sign(
                { user },
                config.key /*{ expiresIn: ONE_WEEK }*/
            )

            //admin Is Valid
            //This object is just used to remove the password from the retuned fields
            let returnuser = {
                email: user.email,
                id: user._id,
            }
            if (!user.verified) {
                return res.status(403).send({
                    message: 'Verify your Account.',
                })
            }

            //Send the response back
            return res.send({
                success: true,
                message: 'You can login now',
                user: returnuser,
                token,
            })
        })
    })
}
