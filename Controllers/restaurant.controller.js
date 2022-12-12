import * as RestaurantService from '../service/restaurant.service.js'

export const addRestaurant = async (req, res) => {
    const restaurant = await RestaurantService.addRestaurant(req.body)
    res.status(200).send(restaurant)
}
export const updateRestaurant = async (req, res) => {
    const restaurant = await RestaurantService.updateRestaurant(
        req.params.id,
        req.body
    )
    res.status(200).send(restaurant)
}

export const getRestaurant = async (req, res) => {
    const restaurant = await RestaurantService.getRestaurantById(req.params.id)
    if (!restaurant) {
        throw new Error('Restaurant not found')
    }
    res.send(restaurant)
}

export const deleteRestaurant = async (req, res) => {
    const id = req.params.id
    try {
        await RestaurantService.deleteRestaurant(id)
        res.status(200).json({ message: 'restaurant deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack })
    }
}

export const find_restau= async(req,res)=>{

    const id = req.params.id
    try {
        await RestaurantService.deleteRestaurant(id)
        res.status(200).json({ message: 'restaurant deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack })
    }


}


