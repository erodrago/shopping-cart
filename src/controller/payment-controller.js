const { PaymentDetail } = require('../database/models');

module.exports = recordPayment = async (req, res) => {

    const { totalAmount, paymentProvider, status, params} = req.body;
    
    // validate body
    if (!totalAmount || !paymentProvider || !status || !params) {
        return res.status(400).send({
            message: 'Provide all payment details!',
        });
    }

    try {
        let payment = await PaymentDetail.create({
            total_amount: totalAmount,
            payment_provider: paymentProvider,
            payment_time: new Date(),
            status,
            params
        });

        return res.send(payment);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
}