import Menu from '../Models/menu.model.js'
import * as menuService from '../service/menu.service.js'

export function add(req,res){
    const menu = new Menu({
        name: req.body.name,
       restaurant:req.body.restaurant,

});
      menu
        .save()
        .then(() => {
          console.log("added");
          res.status(200).json({ msg: "added" });
        })
        .catch((err) => {
          res.status(403).json({ msg: err });
        });
}

export const getMenu = async(req,res)=> {
    const menu = await menuService.getMenuById(req.params.id)
if(!menu){
    throw new Error('not found')
} res.send(menu)
}




export const getMenuByRestaurant = async(req,res)=>{
    const menu = await menuService.getMenuByRestaurant(req.params.id)
    if(!menu){
        throw new Error('not found')
    } res.send(menu)
}

export const getAllMenus = async(req,res)=>{
    const menu = await menuService.getMenuByRestaurant
    if(!menu){
        throw new Error('not found')
    } res.send(menu)
}