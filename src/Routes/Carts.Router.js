import {Router} from "express";
import { CartManager } from "../index.js";

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    try{
        const response = await CartManager.newCart()
        res.json(response)
    }catch (error){
        message: "Error al crear carrito"
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    try{
        const response = await CartManager.getCartProducts(cid)
    } catch(error) {
        message: "Error al enviar los productos del carrito"
    }
})

cartsRouter.post('/:cid/products/:id', async (req, res) => {
    const {cid, id} = req.params;
    try{
        await CartManager.addProductToCart(cid, id)
        return res.status(200).json({
            message: "Producto agregado con éxito"
        })
    }catch(error){
        return res.status(400).json({
            message: "Error al intentar guardar producto en el carrito"
        })
    }
})

export {cartsRouter};