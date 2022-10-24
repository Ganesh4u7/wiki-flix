const router = require("express").Router();

const user_login = require('../controllers/login');
const user_signup = require('../controllers/signup');
const send_otp = require('../controllers/send_otp');
const verify_account = require('../controllers/verify_account');
const user_exist_check = require('../controllers/user_exist_check');
const change_password = require('../controllers/change_password');


router.post('/login',user_login);
router.post('/signup',user_signup);
router.post('/send_otp',send_otp);
router.post('/verify_account',verify_account);
router.post('/user_exist_check',user_exist_check)
router.post('/change_password',change_password);



module.exports = router;