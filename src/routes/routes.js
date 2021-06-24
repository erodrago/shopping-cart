const router = require('./user-routes');
const UserRoute = require('./user-routes');
const CategoryRoute = require('./category-routes');
const DiscountRoute = require('./discount-routes');


router.use('/user', UserRoute);
router.use('/category', CategoryRoute)
router.use('/discount', DiscountRoute)

module.exports = router;