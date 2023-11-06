import {promises as fs} from 'fs'

export class CartManager{
    constructor(){
        this.path = 'cart.json';
        this.carts = [];
        this.cartIdCounter = 1;
    }

    getCarts = async () => {
    const response = await fs.readFile(this.path, 'utf8')
    const responseJSON = JSON.parse(response)
    return responseJSON
    }

    getCartProducts = async(id) => {
        const carts = await this.getCarts()

        const cart = carts.find(cart => cart.id === id)
        if(cart){
            return cart.products
        } else {
            console.log ('Error, no se encontró el carrito')
        }
    }

    newCart = async () => {
        const newCart = {id, products: []}

        this.carts = await this.getCarts()
        this.carts.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(this.carts))
        return newCart;
    }

    addProductToCart = async (cart_id, product_id) => {
        const carts = await this.getCarts()
        const index = carts.findIndex(cart => cart.id ===cart_id)

        if(index != -1){
            const cartProducts = await this.getCartProducts(cart_id)
            const existingProductIndex = cartProducts.findIndex(product => product.prod_id === prod_id)
            
            if (existingProductIndex != -1){
                cartProducts [existingProductIndex].quantity = cartProducts[existingProductIndex].quantity +1
            } else {
                cartProducts.push({prod_id, quantity : 1})
            }

            carts[index].products =  cartProducts

            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log("Se agregó el producto con éxito")
        }else{
            console.log("Carrito no encontrado");
        }
    }
}