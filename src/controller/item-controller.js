const sessionRepository = require('../repository/session-repository.js');
const cartitemRepository = require('../repository/cartitem-repository.js');
const productRepository = require('../repository/product-repository.js');
const discountRepository = require('../repository/discount-repository.js');

const { validationResult } = require('express-validator');

exports.addItemToCart = async (req, res) => {
    const { quantity, productId } = req.body;
    const { sessionId } = req.params;

    // validate body
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    // check if product exists
    const product = await productRepository.findProductById(productId);

    if(!product){
        return res.status(404).send({
            message: `The product with id ${productId} does not exist!`
        })
    }

    // check if there is an existing session exists
    const session = await sessionRepository.findSessionById(sessionId);

    if(!session){
        return res.status(404).send({
            message: `The session does not exist please log in`
        })
    }

    // check if products are available
    if (product.quantity < quantity) {
        return res.status(404).send({
            message: `Stock is sold out`
        })
    }

    let amount = 0;

    // check if product has a discount
    if (product.discount_id){

        const discount = await discountRepository.findDiscountById(product.discount_id);

        const productPrice = product.price - ( product.price * discount.percentageOff / 100 );
        amount = quantity * productPrice;
    }else {
        amount = quantity * product.price;
    }
    
    // increase total amount of items
    const totalAmount = session.totalAmount + amount;

    // check if the item exists and update
    const cartItem = await cartitemRepository.findCartItemBySessionAndProduct(sessionId, product.id);

    try {
        if(cartItem){
            // update existing cart item
            cartItem.amount += amount;
            cartItem.quantity += quantity;

            cartItem.save();
        }else {
            // create new cart item
            await cartitemRepository.createCartItem({
                quantity,
                amount: amount,
                product_id: productId,
                session_id: sessionId
            });
        }
        
        // update session details
        session.totalAmount = totalAmount;

        session.save();
    

        return res.send({
            message: `Item added to cart`
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { sessionId, id, type } = req.params;

    if (!id || !sessionId) {
        return res.status(400).send({
            message: 'Please provide sessionId and ID of item to delete',
        });
    }

    // check if there is an existing session exists
    const session = await sessionRepository.findSessionById(sessionId);

    if(!session){
        return res.status(404).send({
            message: `The session does not exist please log in`
        })
    }

    const cartItem = await cartitemRepository.findCartItemById(id);``

    if (!cartItem) {
        return res.status(404).send({
            message: `Delete unsuccesful!! No item found `,
        });
    }

    // decrease total amount of items

    try {
        if(type=='all' || cartItem.quantity == 1){
            const totalAmount = session.totalAmount - (cartItem.amount);

            await cartItem.destroy().then(() => {
                session.totalAmount = totalAmount;
                session.save();
            });
        } else {
            // decrease cart items by 1
            const oneItemPrice = cartItem.amount / cartItem.quantity;
            cartItem.amount -= oneItemPrice;
            cartItem.quantity -= 1;

            cartItem.save();

            //update session
            const totalAmount = session.totalAmount - oneItemPrice;
            session.totalAmount = totalAmount;
            session.save(); 
        }

        return res.send({
            message: `Item has been removed from cart!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.getAllCartItems = async (req, res) => {
    const { sessionId } = req.params;

    if(!sessionId) {
        return res.status(400).send({
            message: 'Please provide sessionId!!',
        });
    }

    // get cart items
    try {
        const cartItems = await cartitemRepository.findAllCartItemsBySession(sessionId);

        const session = await sessionRepository.findSessionById(sessionId);

        return res.send({
            cartItems: cartItems,
            totalAmount: session.totalAmount
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
    
}