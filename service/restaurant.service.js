import Restaurant from '../Models/restaurant.model.js'

export const getRestaurantById = async (id) => {
    return Restaurant.findById(id)
}

export const addRestaurant = async (userBody) => {
    return Restaurant.create(userBody)
}

export const updateRestaurant = async (id, updatebody) => {
    const restaurant = await getRestaurantById(id)
    if (!restaurant) {
        throw new Error('no restaurant found')
    }
    Object.assign(restaurant, updatebody)
    return await restaurant.save()
}

export async function deleteRestaurant(id) {
    if (!id) {
        throw new Error('no id found')
    }
    return await Restaurant.findOneAndDelete({ _id: id })
}
