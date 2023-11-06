import {promises as fs} from 'fs'

export class ProductManager{
    constructor (){
        this.path = "products.json";
        // Inicializamos this.products leyendo el archivo existente
        this.products = []
        this.productIdCounter = 1;
    }
}

addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
    try {
      // Verificamos que todos los campos requeridos estén presentes y que el stock no sea negativo
      if (
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !code ||
        !status === true,
        !category ||
        stock < 0
      ) {
        return console.log(
          'Error: Se requieren todos los campos y el stock no puede ser negativo.'
        );
      }
  
      // Verificamos si el código del producto ya existe en la lista
      if (this.products.some((product) => product.code === code)) {
        return console.error(
          'Error: El código ya existe en la lista de productos.'
        );
      }
  
      ProductManager.id++;
      let newProduct = {
        id: ProductManager.id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      };
  
      this.products = await this.getProducts();
      // Agregamos el nuevo producto y escribimos el archivo JSON
      this.products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  
      console.log(`Se agregó el producto con código: ${code}`);
    } catch (error) {
      console.error('Error:', error);
    }
    return newProduct;
  };

readProducts = async ({}) => {
    try {
      // Leemos el archivo JSON y lo parseamos
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error:', error);
      // En caso de error, retornamos una matriz vacía
      return [];
    }
  };

getProducts = async({}) => {
    // Imprimimos la lista de productos
    console.log(this.products);
  };

getProductById = async ({prodId}) => {
    // Buscamos un producto por su ID y lo imprimimos si se encuentra
    const product = this.products.find((prod) => prod.id === prodId);
    if (!product) {
      console.log(`No se encuentra el producto con el ID: ${prodId}`);
    } else {
      console.log(product);
    }
  };

deleteProductById = async ({prodId}) => {
    try {
      // Eliminamos un producto por su ID y escribimos el archivo JSON actualizado
      this.products = this.products.filter((prod) => prod.id !== prodId);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log(`Se eliminó el producto con el ID: ${prodId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

updateProductById = async ({productId, product}) => {
    try {
      // Eliminamos el producto existente y luego agregamos el producto actualizado
      this.deleteProductById(productId);
      product.id = productId;
      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log(`Se modificó el producto con el ID: ${productId}`);
    } catch (error) {
      console.error('Error:', error);
    }
};

// Inicializamos ProductManager.id como una propiedad estática
ProductManager.id = 0;

// Ejemplos de uso de los métodos

/*
pm.addProduct('Remera', 'Ropa', 2000, 'Sin imagen', 'c1', 15);
pm.addProduct('Pantalón', 'Ropa', 3500, 'Sin imagen', 'c2', 10);
pm.addProduct('Medias', 'Calzado', 500, 'Sin imagen', 'c3', 50);
pm.addProduct('Zapatillas', 'Calzado', 30000, 'Sin imagen', 'c4', 5);
pm.addProduct('Buzo', 'Ropa', 7000, 'Sin imagen', 'c5', 4);
pm.addProduct('Camisa', 'Ropa', 4000, 'Sin imagen', 'c6', 1);
pm.addProduct('Bermuda', 'Ropa', 3500, 'Sin imagen', 'c7', 4);
pm.addProduct('Zapatos', 'Calzado', 21000, 'Sin imagen', 'c8', 11);
pm.addProduct('Mochila', 'Bolso', 4500, 'Sin imagen', 'c9', 23);
pm.addProduct('Lentes', 'Accesorios', 2500, 'Sin imagen', 'c10', 7);
*/