const { OrderItem, OrderDetail, CartItem, CartSession, PaymentDetail, User } = require('../database/models');
const paginate = require('../helpers/paginate');

exports.postOrderItems = async (req, res) => {
    const { totalAmount, paymentProvider, status, params } = req.body;
    const { sessionId } = req.params;

    if (!totalAmount || totalAmount == 0 || !paymentProvider || !status || !params || !sessionId) {
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
            message: 'Amount is not equal to the price of items',
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

exports.getUserTransactions = async (req, res) => {
    const { uuid } = req.params;
    const { size, page } = req.query;

    if( !uuid ) {
        return res.status(400).send({
            message: `Please provide user identifier!!`
        });
    }

    const user = await User.findOne({
        where: {
            uuid: uuid
        }
    })

    if(!user) {
        return res.status(400).send({
            message: `The user does not exist`
        })
    }


    try {
        const orders = await OrderDetail.findAll({
            where: {
                    user_id: user.id
                },
                ...paginate({page, size}),
                include: ['orderItems', 'payment']
        });

        return res.send(orders);
    } catch(err){
        return res.status(500).send({
            message: `Error: ${err.message}`
        });
    }
}