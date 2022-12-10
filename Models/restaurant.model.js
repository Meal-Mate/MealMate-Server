import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Restaurant = Schema(
    {
        name: {
            type: String,
            required: 'This field is required!',
        },
        address: {
            type: String,
            required: 'This field is required!',
        },
        email: {
            type: String,
            required: 'This field is required!',
            unique: true,
        },
        phone: {
            type: String,
            required: 'This field is required!',
        },
        Verified: {
            type: Boolean,
            default: false,
        },
        coordinates: {
            long: {
                type: Number,
                required: 'This field is required!',
            },
            lat: {
                type: Number, 
                required: 'This field is required!',
            }
        }
    },
    { timestamps: true }
)

export default mongoose.model('Restaurant', Restaurant)
