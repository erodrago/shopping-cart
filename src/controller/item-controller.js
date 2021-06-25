const { CartItem, OrderItem, CartSession} = require('../database/models');

exports.addItemToCart = async (req, res) => {
    const { quantity, amount, productId } = req.body;
    const { sessionId } = req.params;
    
    // validate body
    if (!quantity || !amount || !productId || !sessionId) {
        return res.status(400).send({
            message: `Amount quantity and/or product required have not been provided!`,
        });
    }

    // check if product exists
    const product = await Product.findOne({
        where: {id: productId}
    });

    if(!product){
        return res.status(404).send({
            message: `The product with id ${productId} does not exist!`
        })
    }

    // check if there is an existing session exists
    const session = await CartSession.findOne({
        where: {id: sessionId}
    });

    if(!session){
        return res.status(404).send({
            message: `The session does not exist please log in`
        })
    }

    try {
        let newCartItem = await CartItem.create({
            quantity,
            amount,
            product_id: productId,
            session_id: sessionId
        });
        return res.send(newCartItem);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};