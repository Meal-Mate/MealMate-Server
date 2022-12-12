import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Menu = Schema(
    {
        name: {
            type: String,
            required: 'This field is required!',
        },
       
        
        restaurant: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Restaurant',
            required: 'This field is required!',
        },

        categorie: {
            type: String
        }
        
       
    },
    { timestamps: true }
)

export default mongoose.model('Menu', Menu)
