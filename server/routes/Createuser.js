const express = require('express')
const router = express.Router()
const user = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "JimmysaysWoahhhbhavbhav ";

router.post("/createuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async function (req , res) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }    

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
 


    try {
       await user.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword
        })
        res.json({success:true});
    } catch (error) {
        console.log("------", error);
        res.json({success:false});
    }


})


router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async function (req , res) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }    
    let email = req.body.email;
    try {
       let userdata = await user.findOne({ email });
       if(!userdata){
        return res.status(400).json({ errors: "Try login with correct credentials" })
       }
 
       const pwdCompare = await bcrypt.compare(req.body.password, userdata.password); // this return true false.
       if(!pwdCompare)
       {
        return res.status(400).json({ errors: "Try login with correct credentials" })
       }

       const data = {
        user: {
            id: userdata.id
        }
    }
    
    const authToken = jwt.sign(data, jwtSecret);
    return res.json({ success: true, authToken:authToken })

    } catch (error) {
        console.log("----", error);
        res.json({success:false});
    }


     })

module.exports = router;