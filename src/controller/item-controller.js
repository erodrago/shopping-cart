const { CartItem, CartSession, Product, Discount} = require('../database/models');

exports.addItemToCart = async (req, res) => {
    const { quantity, productId } = req.body;
    const { sessionId } = req.params;

    // validate body
    if (!quantity || !productId || !sessionId) {
        return res.status(400).send({
            message: `Quantity and/or product required have not been provided!`,
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

    let amount = 0;

    // check if product has a discount
    if (product.discount_id){

        const discount = await Discount.findOne({
            where: {id: product.discount_id}
        });

        const productPrice = product.price - ( product.price * discount.percentageOff / 100 );
        amount = quantity * productPrice;
    }else {
        amount = quantity * product.price;
    }
    
    // increase total amount of items
    const totalAmount = session.totalAmount + amount;

    // check if the item exists and update
    const cartItem = await CartItem.findOne({
        where: {
            session_id: sessionId,
            product_id: product.id
        }
    })

    try {
        if(cartItem){
            // update existing cart item
            cartItem.amount += amount;
            cartItem.quantity += quantity;

            cartItem.save();
        }else {
            // create new cart item
            await CartItem.create({
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

    try {
        if(type=='all'){
            await cartItem.destroy().then(() => {
                const totalAmount = session.totalAmount - (cartItem.amount);

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
        const cartItems = await CartItem.findAll({
            where: {session_id: sessionId}
        });

        const session = await CartSession.findOne({
            where: {id: sessionId}
        });

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