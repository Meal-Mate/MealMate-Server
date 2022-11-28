import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Proposition = Schema(
    {
        owner: {
            type: String,
            required: 'This field is required!',
        },
        name: {
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

export default mongoose.model('Proposition', Proposition)
