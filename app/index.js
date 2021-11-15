const yargs = require("yargs");
const chalk = require('chalk');
const { getAllProduct, getAllProductById, importProduct, updateProduct, createProduct, deleteProduct } = require("./model/products.js");
yargs.command({
    command: "test",
    handler: () => {
        console.log("test")
    },
})
// tao CRUD
// create : node app/index.js create --name="Test" --price=10 --amount=1 --description="cha co gi ca"
yargs.command({
    command: "create",
    builder: {
        name: {
            type: "string"
        },
        price: {
            type: "number"
        },
        amount: {
            type: "number"
        },
        description: {
            type: "string"
        }
    },
    handler: (arg) => {
        const { name, price, amount, description } = arg
        const newListProdcut = createProduct(name, price, amount, description);
        if (newListProdcut) {
            console.log(chalk.green("products : "), newListProdcut)
        }
        else {
            console.log(chalk.red("Create Failed"))
        }
    },
})
// get-all : node app/index.js get-all
yargs.command({
    command: "get-all",
    handler: () => {
        const listProduct = getAllProduct();
        if (listProduct.length > 0) {
            console.log(chalk.green("products : "), listProduct)
        }
        else {
            console.log(chalk.red("The list of product is empty"))
        }

    },
})
// get-detail : node app/index.js get-detail --id="1"
yargs.command({
    command: "get-detail",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (arg) => {
        const { id } = arg
        const product = getAllProductById(id)
        if (product) {
            console.log(chalk.green("product : "), product)
        }
        else {
            console.log(chalk.red("Not Found Product with ID " + id))
        }
    },
})
// update : node app/index.js update  --id="1" --name="Tuan" --price=11 --amount=1 --description="cha co gi ca"
yargs.command({
    command: "update",
    builder: {
        id: {
            type: "string"
        },
        name: {
            type: "string"
        },
        price: {
            type: "number"
        },
        amount: {
            type: "number"
        },
        description: {
            type: "string"
        }
    },
    handler: (arg) => {
        const { id, name, price, amount, description } = arg;
        let productUpdate = updateProduct(id, name, price, amount, description);
        if (productUpdate) {
            console.log(chalk.green("update successfully"));
            console.log(chalk.green("The product has been updated : "), productUpdate)
        }
        else {
            console.log(chalk.red("Not Found Product with ID " + id))
        }
    },
})
//delete : node app/index.js delete --id="0.505693686974523"
yargs.command({
    command: "delete",
    builder: {
        id: {
            type: "string"
        },
    },
    handler: (arg) => {
        const { id } = arg
        let listProdcut = deleteProduct(id)
        if (listProdcut) {
            console.log(chalk.green("delete successfully"))
            console.log(chalk.green("product"), listProdcut)
        }
        else {
            console.log(chalk.red("delete failed!"))
            console.log(chalk.red(" Not Found Product with ID " + id))
        }
    }

})
// import-product : node app/index.js import-product --id="1"
yargs.command({
    command: "import-product",
    builder: {
        id: {
            type: "string"
        },
    },
    handler: (arg) => {
        const { id } = arg
        let product = importProduct(id)
        if (product) {
            console.log(chalk.green("update successfully"))
            console.log(chalk.green("products when updating amount"), product)
        }
        else {
            console.log(chalk.red("import failed!"))
            console.log(chalk.red(" Not Found Product with ID " + id))
        }
    }

})
yargs.parse()
