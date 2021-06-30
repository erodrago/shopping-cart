const { OrderItem } = require('../database/models');
const paginate = require('../helpers/paginate')

exports.createOrderItem = async payload => {
    const newOrderItem = await OrderItem.create(payload);
    return newOrderItem;
}