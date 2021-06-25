const { CartItem, CartSession} = require('../database/models');

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

    // increase total amount of items
    const totalAmount = session.totalAmount + (quantity * amount);

    try {
        await CartItem.create({
            quantity,
            amount,
            product_id: productId,
            session_id: sessionId
        }).then(() => {
            // update session info
            session.total_amount = totalAmount;

            session.save();
        });

        return res.send({
            message: `Iem added to cart`
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { sessionId, id } = req.params;

    if (!id || sessionId) {
        return res.status(400).send({
            message: 'Please provide sessionId and ID of item to delete',
        });
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

    const cartItem = await CartItem.findOne({
        where: {
            id,
        },
    });

    if (!cartItem) {
        return res.status(404).send({
            message: `Delete unsuccesful!! No item found `,
        });
    }

    // decrease total amount of items
    const totalAmount = session.totalAmount - (cartItem.quantity * cartItem.amount);

    try {
        await cartItem.destroy().then(() => {
            session.total_amount = totalAmount;

            session.save();
        });
        return res.send({
            message: `Item has been removed from cart!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.getAllCartItems = (req, res) => {
    const { sessionId } = req.params;

    // get cart items
    try {
        const cartItems = await CartItem.findAll({
            where: {session_id: sessionId}
        })

        return res.send(cartItems);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
    
}