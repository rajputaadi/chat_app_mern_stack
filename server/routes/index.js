const express =  require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require("../controller/checkEmail")
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails');
const logout = require('../controller/logout');
const updateUserDetails = require('../controller/updateUserDetails');


const router  = express.Router()

//create user api
router.post('/register',registerUser)
//check user email
router.post('/email',checkEmail)
//check password
router.post('/password',checkPassword)
//user deatils
router.get('/user-details',userDetails)
//log out user
router.get('/logout',logout)
//update user details
router.post('/update-user',updateUserDetails)

module.exports = router