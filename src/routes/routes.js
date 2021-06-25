const router = require('./user-routes');
const UserRoute = require('./user-routes');
const CategoryRoute = require('./category-routes');
const DiscountRoute = require('./discount-routes');
const ProductRoute = require('./product-routes');


router.use('/user', UserRoute);
router.use('/category', CategoryRoute);
router.use('/discount', DiscountRoute);
router.use('/product', ProductRoute);

module.exports = router;