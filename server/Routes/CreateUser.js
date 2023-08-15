const express = require('express')
const router = express.Router()
const User=require("../models/User")
const { body, validationResult } = require('express-validator');
//jwt token contains 3 things 1st.header,alg 
//2nd payload(unique message) usually id
//3rd secret saved in .env file or in server lgeneraly 32 bit longer 
// we store jwt token in cache memory/localstorage
// and server recognizes if the user is authentic or not
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MyNameisDivyanshuSinghRathoreIITBHU2024"

//checking for validation
router.post("/createuser", [
body('email').isEmail(),
body('name').isLength({min:5}),
body('password','Incorrect Password').isLength({min:5})]
,async (req , res) =>{
  

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

router.post("/loginuser",[

    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})],
    
async (req , res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let email = req.body.email;
    
        try {
            let userData = await User.findOne( {email} );
            if(!userData){
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            //comparing password
            if(!pwdCompare){
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }
            //mandatory... payload
            const data = {
                user:{
                    id:userData.id
                }
            }
            //generating token when user logs in
            const authToken = jwt.sign(data,jwtSecret)
            //user dont know secret key
            return res.json({ success:true,authToken:authToken })
        } catch (error) {
            console.log(error)
            res.json({success:false});
        }
    })

module.exports = router;