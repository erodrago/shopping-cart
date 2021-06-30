const { CartSession } = require('../database/models');

exports.createCartSession = async payload => {
    const newCartSession = await CartSession.create(payload);
    return newCartSession;
}