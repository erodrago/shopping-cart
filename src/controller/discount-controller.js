const { Discount } = require('../database/models');
const paginate = require('../helpers/paginate');

exports.createDiscount = async (req, res) => {
    const { name, description, percentageOff, active } = req.body;
    
    // validate body
    if (!name || !description, !percentageOff) {
        return res.status(400).send({
            message: 'Please provide a name, discreption and the percentage off to create a Discount!',
        });
    }

    // check if Discount exists
    let discountExists = await Discount.findOne({
        where: {
            name,
        },
    });

    if (discountExists) {
        return res.status(400).send({
            message: 'A Discount with the entered Discount name already exists!',
        });
    }

    try {
        let newDiscount = await Discount.create({
            name,
            description,
            percentageOff,
            active
        });

        return res.send(newDiscount);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.getAllDiscounts = async (req, res) => {
    const {page, size} = req.query;

    if(!page || !size){
        return res.status(400).send({
            message: 'Requires page and size request params',
        });
    }

    try {
        const discounts = await Discount.findAll({
            ...paginate({page, size})
        });

        return res.send(discounts);
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
}

exports.getDiscountById = async (req, res) => {
    const { id } = req.params;

    const discount = await Discount.findOne({
        where: {
            id,
        },
    });

    if (!discount) {
        return res.status(404).send({
            message: `No Discount found with the id ${id}`,
        });
    }

    return res.send(discount);
};


exports.updateDiscount = async (req, res) => {

    const { name, description, percentageOff } = req.body;

    const { id } = req.params;

    const discount = await Discount.findOne({
        where: {
            id,
        },
    });

    if (!discount) {
        return res.status(400).send({
            message: `No Discount found with the id ${id}`,
        });
    }

    try {
        if(name) {
            discount.name = name;
        }
        if(description) {
            discount.description = description;
        }
        if(percentageOff) {
            discount.percentageOff = percentageOff;
        }

        discount.save();

        return res.send({
            message: `Discount ${id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.switchDiscountActiveStatus = async (req, res) => {

    const { id } = req.params;

    const discount = await Discount.findOne({
        where: {
            id,
        },
    });

    if (!discount) {
        return res.status(400).send({
            message: `No Discount found with the id ${id}`,
        });
    }

    let status = discount.active;

    try {
        discount.active = !status;

        discount.save();

        return res.send({
            message: `Discount with ${id} activity status has been switched to ${discount.active}!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.deleteDiscount = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({
            message: 'Please provide ID of Discount to delete',
        });
    }

    const discount = await Discount.findOne({
        where: {
            id,
        },
    });

    if (!discount) {
        return res.status(404).send({
            message: `No Discount found with the id ${id}`,
        });
    }

    try {
        await discount.destroy();

        return res.send({
            message: `Discount with ${id} has been deleted!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};