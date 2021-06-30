const { Discount } = require('../database/models');
const paginate = require('../helpers/paginate')

exports.createDiscount = async payload => {
    const newDiscount = await Discount.create(payload);
    return newDiscount;
}

exports.findDiscountById = async id => {
    const discount = await Discount.findOne({
        where:{
            id
        }
    })

    return discount;
}

exports.findDiscountByName = async name => {
    const discount = await Discount.findOne({
        where:{
            name
        }
    })

    return discount;
}

exports.findAllDiscounts = async (page, size) => {
    const discounts = await Discount.findAll({
            ...paginate({page, size})
    });

    return discounts;
}

exports.findByIdAndDelete = async id => {
    const discount = await Discount.findOne({
        where: {
            id,
        },
    });

    discount.destroy();
}