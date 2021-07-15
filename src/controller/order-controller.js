const orderRepository = require('../repository/order-repository.js');
const sessionRepository = require('../repository/session-repository.js');
const paymentRepository = require('../repository/payment-repository.js');
const cartitemRepository = require('../repository/cartitem-repository.js');
const orderitemRepository = require('../repository/orderitem-repository.js');
const productRepository = require('../repository/product-repository.js');
const userRepository = require('../repository/user-repository.js');

exports.postOrderItems = async (req, res) => {
    const { totalAmount, paymentProvider, status, params } = req.body;
    const { sessionId } = req.params;

    if (!totalAmount || totalAmount == 0 || !paymentProvider || !status || !params || !sessionId) {
        return res.status(400).send({
            message: 'Please provide totalAmount, paymentProvider, status and params of item to delete',
        });
    }

    //get session infomation
    const session = await sessionRepository.findSessionById(sessionId);

    if(session.totalAmount != totalAmount){
        return res.status(400).send({
            message: 'Amount is not equal to the price of items',
        });
    }

    // post payment information
    let payment;
    try {
        payment = await paymentRepository.createPaymentDetail({
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
    const cartItems = await cartitemRepository.findAllCartItemsBySession(sessionId);
    
    // create an order
    let order = await orderRepository.createOrderDetail({
        user_id: session.user_id,
        totalAmount: session.totalAmount,
        payment_id: payment.id,
        orderTime: new Date()
    });
    
   
    try {
        // copy cart items to order items and delete upon succesful purchase
        // bulk save 
        if(Array.isArray(cartItems)){
            console.log("ARRAY")
            for(const cartItem of cartItems) {
                const orderitem = await orderitemRepository.createOrderItem({
                    product_id: cartItem.product_id,
                    order_id: order.id,
                    quantity: cartItem.quantity,
                    amount: cartItem.amount
                })
                //remove items from cart table
                cartItem.destroy();

                // get product 
                const product = await productRepository.findProductById(orderitem.product_id);

                product.quantity -= orderitem.quantity;
                product.save();
            }
        }else{
            const orderitem = await orderitemRepository.createOrderItem({
                    product_id: cartItems.product_id,
                    order_id: order.id,
                    quantity: cartItems.quantity,
                    amount: cartItems.amount
                })


            //remove items from cart table
            cartItems.destroy();

            // get product 
            const product = await productRepository.findProductById(orderitem.product_id);

            product.quantity -= orderitem.quantity;
            product.save();
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

    const user = await userRepository.findUserById(uuid);

    if(!user) {
        return res.status(400).send({
            message: `The user does not exist`
        })
    }


    try {
        const orders = await orderRepository.findAllOrderDetailsOfUser(user.id, page, size);

        return res.send(orders);
    } catch(err){
        return res.status(500).send({
            message: `Error: ${err.message}`
        });
    }
}