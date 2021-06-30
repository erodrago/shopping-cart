const { Product } = require('../database/models');
const paginate = require('../helpers/paginate')

exports.createProduct = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct;
}

exports.findProductById = async id => {
    const product = await Product.findOne({
        where:{
            id
        }
    })

    return product;
}

exports.findProductByName = async name => {
    const product = await Product.findOne({
        where:{
            name
        }
    })

    return product;
}

exports.findAllProducts = async (page, size) => {
    const products = await Product.findAll({
            ...paginate({page, size}),
            include: ['discount', 'category'],
    });

    return products;
}

exports.findByIdAndDelete = async id => {
    const product = await Product.findOne({
        where: {
            id,
        },
    });

    product.destroy();
}