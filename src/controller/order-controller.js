const { OrderItem, OrderDetail, CartItem, CartSession, PaymentDetail } = require('../database/models');

exports.postOrderItems = async (req, res) => {
    const { totalAmount, paymentProvider, status, params } = req.body;
    const { sessionId } = req.params;

    if (!totalAmount || !paymentProvider || !status || !params || !sessionId) {
        return res.status(400).send({
            message: 'Please provide totalAmount, paymentProvider, status and params of item to delete',
        });
    }

    //get session infomation
    const session = await CartSession.findOne({
        where: {id: sessionId}
    });

    if(session.totalAmount != totalAmount){
        return res.status(400).send({
            message: 'Amount is less than the price of items',
        });
    }

    // post payment information
    let payment;
    try {
        payment = await PaymentDetail.create({
            amount: totalAmount,
            payment_provider: paymentProvider,
            payment_time: new Date(),
            status: status,
            params: params
        });

    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }

    // get cart items
    const cartItems = await CartItem.findAll({
        where: {session_id: sessionId}
    })

    if(!cartItems) {
        return res.status(404).send({
            message: `No cart items found!! please add items to purchase `,
        });
    }

    
    // create an order
    let order = await OrderDetail.create({
        user_id: session.user_id,
        totalAmount: session.totalAmount,
        payment_id: payment.id,
        orderTime: new Date()
    });
    
   
    try {
        // copy cart items to order items and delete upon succesful purchase
        // bulk save 
        for(const cartItem of cartItems) {
            await OrderItem.create({
                product_id: cartItem.product_id,
                order_id: order.id,
                quantity: cartItem.quantity,
                amount: cartItem.amount
            })
        }
        // reset session
        session.totalAmount = 0;

        session.save();
    
        return res.send(order);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
}