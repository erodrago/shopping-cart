const { OrderDetail } = require('../database/models');
const paginate = require('../helpers/paginate')

exports.createOrderDetail = async payload => {
    const newOrderDetail = await OrderDetail.create(payload);
    return newOrderDetail;
}

exports.findOrderDetailById = async id => {
    const OrderDetail = await OrderDetail.findOne({
        where:{
            id
        }
    })

    return OrderDetail;
}


exports.findAllOrderDetailsOfUser = async (userId, page, size) => {
    const OrderDetails = await OrderDetail.findAll({
            where: {
                user_id: userId
            },
            ...paginate({page, size}),
            include: ['orderItems', 'payment']
    });

    return OrderDetails;
}