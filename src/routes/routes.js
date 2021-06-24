const router = require('./user-routes');
const UserRoute = require('./user-routes');
const CategoryRoute = require('./category-routes');


router.use('/user', UserRoute);
router.use('/category', CategoryRoute)

module.exports = router;