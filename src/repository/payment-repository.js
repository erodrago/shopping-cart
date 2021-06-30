const { PaymentDetail } = require('../database/models');

exports.createPaymentDetail = async payload => {
    const newPaymentDetail = await PaymentDetail.create(payload);
    return newPaymentDetail;
}