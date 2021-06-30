const { CartItem } = require('../database/models');

exports.createCartItem = async payload => {
    const newCartItem = await CartItem.create(payload);
    return newCartItem;
}

exports.findCartItemById = async id => {
    const cartItem = await CartItem.findOne({
        where:{
            id: id
        }
    })

    return cartItem;
}

exports.findCartItemBySession = async sessionId => {
    const cartItem = await CartItem.findOne({
        where:{
            session_id: sessionId
        }
    })

    return cartItem;
}

exports.findCartItemBySessionAndProduct = async (sessionId, productId) => {
    const cartItem = await CartItem.findOne({
        where: {
            session_id: sessionId,
            product_id: productId
        }
    })

    return cartItem;
}

exports.findAllCartItemsBySession = async sessionId => {
    const cartItems = await CartItem.findAll({
        where: {session_id: sessionId}
    });

    return cartItems;
}

exports.findByIdAndDelete = async id => {
    const cartItem = await CartItem.findOne({
        where: {
            id,
        },
    });

    cartItem.destroy();
}