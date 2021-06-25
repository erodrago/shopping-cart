const { Category } = require('../database/models');
const paginate = require('../helpers/paginate')

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    
    // validate body
    if (!name || !description) {
        return res.status(400).send({
            message: 'Please provide a name and description to create a Category!',
        });
    }

    // check if category exists
    let categoryExists = await Category.findOne({
        where: {
            name,
        },
    });

    if (categoryExists) {
        return res.status(400).send({
            message: 'A Category with the entered Categoryname already exists!',
        });
    }

    try {
        let newCategory = await Category.create({
            name,
            description,
        });

        return res.send(newCategory);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.getAllCategories = async (req, res) => {
    const {page, size} = req.query;

    if(!page || !size){
        return res.status(400).send({
            message: 'Requires page and size request params',
        });
    }

    try {
        const categories = await Category.findAll({
            ...paginate({page, size})
        });

        return res.send(categories);
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
}

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findOne({
        where: {
            id,
        },
    });

    if (!category) {
        return res.status(404).send({
            message: `No Category found with the id ${id}`,
        });
    }

    return res.send(category);
};


exports.updateCategory = async (req, res) => {

    const { name, description } = req.body;

    const { id } = req.params;

    const category = await Category.findOne({
        where: {
            id,
        },
    });

    if (!category) {
        return res.status(400).send({
            message: `No Category found with the id ${id}`,
        });
    }

    try {
        if(name) {
            category.name = name;
        }
        if(description) {
            category.description = description;
        }

        category.save();

        return res.send({
            message: `Category ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({
            message: 'Please provide ID of Category to delete',
        });
    }

    const category = await Category.findOne({
        where: {
            id,
        },
    });

    if (!category) {
        return res.status(404).send({
            message: `No Category found with the id ${id}`,
        });
    }

    try {
        await category.destroy();

        return res.send({
            message: `Category ${id} has been deleted!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};