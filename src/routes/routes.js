const router = require('./user-routes');
const userRoute = require('./user-routes');
const categoryRoute = require('./category-routes');
const discountRoute = require('./discount-routes');
const productRoute = require('./product-routes');
const cartItemRoute = require('./item-router');
const orderRoute = require('./order-routes');


router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/discount', discountRoute);
router.use('/product', productRoute);
router.use('/cart', cartItemRoute);
router.use('/order', orderRoute);

module.exports = router;