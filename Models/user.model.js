import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const User = Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        Sexe: {
            type: String,
        },

        phone: {
            type: String,
            required: true,
        },

        Verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

User.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    //Generate Salt Value
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        //Use this salt value to hash password
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            this.password = hash
            next()
        })
    })
})

//Custom method to check the password correct when login
User.methods.isPasswordMatch = function (plainPassword, hashed, callback) {
    bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
        if (err) {
            return callback(err)
        }
        callback(null, isMatch)
    })
}

export default mongoose.model('User', User)
