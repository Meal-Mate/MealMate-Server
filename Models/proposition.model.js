import mongoose from 'mongoose'
import { geocoder } from '../utils/geocoder.js'

const Schema = mongoose.Schema
const Proposition = Schema(
    {
        owner: {
            type: String,
            required: 'This field is required!',
        },
        address: {
            type: String,
            required: 'This field is required!',
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
            },
        },
        restaurantName: {
            type: String,
            required: 'This field is required!',
        },
        mates: {
            type: String,
        },
        date: {
            type: String,
            required: 'This field is required!',
        },
    },
    { timestamps: true }
)

// Geocode & create location
Proposition.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)
    console.log(loc)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
    }

    // Do not save address in DB
    this.address = undefined
    next()
})

export default mongoose.model('Proposition', Proposition)
