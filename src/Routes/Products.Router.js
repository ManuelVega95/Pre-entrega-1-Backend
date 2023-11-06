import {Router} from "express"; 
import {ProductManager} from "../index.js";

const productsRouter = Router();

productsRouter.get('/', async(req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.status(400).json({
        message: "Se excedió el límite"
    })
    let allProducts = await readProducts
    let productLimit = allProducts.slice(limit)
    res.send(productLimit);
})

productsRouter.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    if(!productById) return res.status(400).json({
        message: `El producto con el id ${id} no existe`
    })
    res.send(productById)
})

productsRouter.post('/products', (req, res) => {

    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body

        if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
            return res.status(400).json({
                message: "Faltan completar datos"
            })
        }

        return res.json({
            title: '',
            description: '',
            price: 0,
            thumbnail: '',
            code: 0,
            stock: 0,
            status: true,
            category: '',

        }).status(200)

    } catch (error) {
        return res.status(501).json({
            message: "Error inesperado del servidor"
        })
    }
})

productsRouter.put('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        await ProductManager.updateProductById(id, {title, description, price, thumbnail, code, stock, status, category})
        return res.status(200).json({
            message: "Producto actualizado"
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error, no se pudo actualizar el producto con el id ${id}`
        })
    }
})

productsRouter.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    try {
        const {title, description, price, thumbnail, code, stock, status, category} = req.body;
        await ProductManager.deleteProductById(id)
        return res.status(200).json({
            message: "Producto eliminado"
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error, no se pudo eliminar el producto con el id ${id}`
        })
    }
})


export {productsRouter};