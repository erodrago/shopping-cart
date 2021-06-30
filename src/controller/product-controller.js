const categoryRepository = require('../repository/category-repository.js');
const productRepository = require('../repository/product-repository.js');
const discountRepository = require('../repository/discount-repository.js');

exports.createProduct = async (req, res) => {
    const { name, description, sku, quantity, price, categoryId, discountId } = req.body;
    
    // validate body
    if (!name || !description || !sku || !quantity || !price || !categoryId || !discountId) {
        return res.status(400).send({
            message: `Please provide a name, description, sku, quantity, and price 
            to create a Product!`,
        });
    }

    // check if Product exists
    let productExists = await productRepository.findProductByName(name);

    if (productExists) {
        return res.status(400).send({
            message: 'A Product with the entered Productname already exists!',
        });
    }

    // check if category exists
    const category = await categoryRepository.findCategoryById(categoryId);

    if(!category){
        return res.status(404).send({
            message: `The category with id ${categoryId} does not exist!`
        })
    }

    // check if dicount exists
    const discount = await discountRepository.findDiscountById(discountId);

    if(!discount){
        return res.status(404).send({
            message: `The discount with id ${discountId} does not exist!`
        })
    }

    let payload = {
        name: name,
        description: description,
        sku: sku,
        quantity: quantity,
        price: price,
        category_id: category.id,
        discount_id: discount.id
    }

    try {
        let newProduct = await productRepository.createProduct(payload);

        return res.send(newProduct);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.getAllProducts = async (req, res) => {
    const {page, size} = req.query;

    if(!page || !size){
        return res.status(400).send({
            message: 'Requires page and size request params',
        });
    }

    try {
        const products = await productRepository.findAllProducts(page, size);

        return res.send(products);
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
}

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    const product = await productRepository.findProductById(id);

    if (!product) {
        return res.status(404).send({
            message: `No Product found with the id ${id}`,
        });
    }

    return res.send(product);
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({
            message: 'Please provide ID of Product to delete',
        });
    }

    const product = await productRepository.findProductById(id);

    if (!product) {
        return res.status(404).send({
            message: `No Product found with the id ${id}`,
        });
    }

    try {
        await productRepository.findByIdAndDelete(id);

        return res.send({
            message: `Product ${id} has been deleted!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.updateProduct = async (req, res) => {

    const { name, description, sku, quantity, price, categoryId, discountId } = req.body;

    const { id } = req.params;

    const product = await productRepository.findProductById(id);

    if (!product) {
        return res.status(400).send({
            message: `No Product found with the id ${id}`,
        });
    }

    try {
        if(name) {
            product.name = name;
        }
        if(description) {
            product.description = description;
        }
        if(sku) {
            product.sku = sku;
        }
        if(quantity) {
            product.quantity = quantity;
        }
        if(price) {
            product.price = price;
        }
        if(categoryId) {
            product.category_id = categoryId;
        }
        if(discountId) {
            product.discount_id = discountId;
        }

        product.save();
        return res.send({
            message: `Product ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};