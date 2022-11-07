const router = require("express").Router();

const user_login = require('../controllers/login');
const user_signup = require('../controllers/signup');
const send_otp = require('../controllers/send_otp');
const verify_account = require('../controllers/verify_account');
const user_exist_check = require('../controllers/user_exist_check');
const change_password = require('../controllers/change_password');
const add_to_wishlist = require("../controllers/add_to_wishlist");
const remove_from_wishlist = require("../controllers/remove_from_wishlist");
const get_wishlist = require("../controllers/get_wishlist");
const check_wishlist = require("../controllers/check_whishlist");
const rate_a_movie = require("../controllers/rate_a_movie");
const get_rating = require("../controllers/get_rating_by_titleId");
const check_user_rating = require("../controllers/check_user_rating");


router.post('/login',user_login);
router.post('/signup',user_signup);
router.post('/send_otp',send_otp);
router.post('/verify_account',verify_account);
router.post('/user_exist_check',user_exist_check)
router.post('/change_password',change_password);

//Wishlist APIs
router.post('/add_to_wishlist',add_to_wishlist);
router.post('/remove_from_wishlist',remove_from_wishlist);
router.post('/get_wishlist',get_wishlist);
router.post('/check_wishlist',check_wishlist);


//Ratings APIs
router.post('/rate_a_movie',rate_a_movie);
router.post('/get_rating_by_titleId',get_rating);
router.post('/check_user_rating',check_user_rating)



module.exports = router;