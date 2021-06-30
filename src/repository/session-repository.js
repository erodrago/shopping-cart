const { CartSession } = require('../database/models');

exports.createCartSession = async payload => {
    const newCartSession = await CartSession.create(payload);
    return newCartSession;
}

exports.findSessionById = async id => {
    const cartSession = await CartSession.findOne({
        where:{
            id
        }
    })

    return cartSession;
}