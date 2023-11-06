import express from 'express';
import {ProductManager} from './ProductManager.js';
import { CartManager } from './CartManager.js';
import { productsRouter } from './Routes/Products.Router.js';
import { cartsRouter } from './Routes/Carts.Router.js';

const PORT = 8080;

const app = express();

export const ProductManager = new ProductManager;
export const CartManager = new CartManager;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, (req, res) => {
    console.log(`Conectado al puerto ${PORT}!`);
})
/*
server.on("error", (error) => 
console.log(`error en el servidor ${error}`))
*/