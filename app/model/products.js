const fs = require("fs")


const getAllProduct = () => {
    const buffer = fs.readFileSync("app/products.json")
    const listProdcut = JSON.parse(buffer)
    return listProdcut
}

const getAllProductById = (id) => {
    let listProduct = getAllProduct();
    let index = listProduct.findIndex((item) => item.id === id);
    if (index !== -1) {
        return listProduct[index]
    }
    else return false
}

const createProduct = (name, price, amount, description) => {
    let listProduct = getAllProduct();
    let newProduct = {
        id: Math.random().toString(),
        name: name,
        price: price,
        amount: amount,
        description: description
    }
    let newList = [...listProduct, newProduct]
    fs.writeFileSync("app/products.json", JSON.stringify(newList))
    return newList
}

const updateProduct = (id, name, price, amount, description) => {
    let listProduct = getAllProduct();
    let index = listProduct.findIndex((item) => item.id === id);
    if (index !== -1) {
        let oldProduct = listProduct[index]
        let newProduct = { ...oldProduct, amount: amount, name: name, price: price, description: description }
        listProduct[index] = newProduct;
        fs.writeFileSync("app/products.json", JSON.stringify(listProduct));
        return newProduct
    }
    else return false
}
const deleteProduct = (id) => {
    let listProduct = getAllProduct();
    let index = listProduct.findIndex((item) => item.id === id);

    if (index !== -1) {
        const newList = listProduct.filter((item) => item.id !== id)
        fs.writeFileSync("app/products.json", JSON.stringify(newList));
        return newList
    }
    else return false

}

const importProduct = (id) => {
    let listProduct = getAllProduct();
    let index = listProduct.findIndex((item) => item.id === id);
    if (index !== -1) {
        let oldProduct = listProduct[index]
        let newProduct = { ...oldProduct, amount: parseInt(oldProduct.amount) + 50 }
        listProduct[index] = newProduct;
        fs.writeFileSync("app/products.json", JSON.stringify(listProduct));
        return newProduct
    }
    else return false
}

module.exports = {
    getAllProduct,
    getAllProductById,
    importProduct,
    updateProduct,
    createProduct,
    deleteProduct
}