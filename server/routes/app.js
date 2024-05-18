const express = require('express')
const registeruser = require('../controller/registeruser')
const checkemail = require('../controller/checkemail')
const checkpassword = require('../controller/checkpassword')
const userdetails = require('../controller/userdetails')
const logout = require('../controller/logout')
const updateuserdetails = require('../controller/updateuserdetails')
const searchuser = require('../controller/searchuser')

const router = express.Router()

//create user api
router.post('/register',registeruser)
//check user email
router.post('/email',checkemail)
//check user password
router.post('/password',checkpassword)
//login user details
router.get('/user-details',userdetails)
//logout user
router.get('/logout',logout)
//update user details
router.post('/update-user',updateuserdetails)
//search user
router.post("/search-user",searchuser)


module.exports = router