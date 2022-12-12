import Menu from '../Models/menu.model.js'

export const getMenuById = async (id) => {
return Menu.findById(id).populate('restaurant') 
}

export const getAllMenus = async () => {
    return Menu.find().populate('restaurant')
}

export const getMenuByRestaurant = async(idr)=>{
    return Menu.find({restaurant:idr}).populate('restaurant')
}