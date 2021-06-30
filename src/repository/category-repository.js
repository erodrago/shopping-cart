const { Category } = require('../database/models');
const paginate = require('../helpers/paginate')

exports.createCategory = async payload => {
    const newCategory = await Category.create(payload);
    return newCategory;
}

exports.findCategoryById = async id => {
    const category = await Category.findOne({
        where:{
            id
        }
    })

    return category;
}

exports.findCategoryByName = async name => {
    const category = await Category.findOne({
        where:{
            name
        }
    })

    return category;
}

exports.findAllCategories = async (page, size) => {
    const categories = await Category.findAll({
            ...paginate({page, size})
    });

    return categories;
}

exports.findByIdAndDelete = async id => {
    const category = await Category.findOne({
        where: {
            id,
        },
    });

    category.destroy();
}