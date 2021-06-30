const categoryRepository = require('../repository/category-repository.js')

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    
    // validate body
    if (!name || !description) {
        return res.status(400).send({
            message: 'Please provide a name and description to create a Category!',
        });
    }

    let payload = {
        name: name,
        description: description
    }

    // check if category exists
    let categoryExists = await categoryRepository.findCategoryByName(name);
    console.log(categoryExists)

    if (categoryExists) {
        return res.status(400).send({
            message: 'A Category with the entered category name already exists!',
        });
    }

    try {
        let newCategory = await categoryRepository.createCategory(payload);

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
        const categories = await categoryRepository.findAllCategories(page, size);

        return res.send(categories);
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
}

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;

    const category = await categoryRepository.findCategoryById(id);

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

    const category = await categoryRepository.findCategoryById(id);

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

    const category = await categoryRepository.findCategoryById(id);

    if (!category) {
        return res.status(404).send({
            message: `No Category found with the id ${id}`,
        });
    }

    try {
        categoryRepository.findByIdAndDelete(id);

        return res.send({
            message: `Category ${id} has been deleted!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};