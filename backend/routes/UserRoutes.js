const express = require('express');
const router = express.Router();

// Importing Schemas from models
const Users = require('../models/UserModel');
const {isUserLoggedIn} = require("../middlewares/userMiddlewares");

// ROUTES

// GET--------------------------------------->

// Gets all Users
router.get('/allUsers', async (req, res)=>{
    try{
        const allUsers = await Users.find({}, {_id:1, firstName:1, lastName:1, social:1});
        res.json(allUsers);
    }catch(err){
        res.json({message:err});
    }

});

router.get('/allData',isUserLoggedIn, async (req, res)=>{
    try{
        const allUsers = await Users.find();
        res.json(allUsers);
    }catch(err){
        res.json({message:err});
    }

});

// Find User with particular UserId
router.get('/findUser/:UserId', async (req, res)=>{

    try{
       const foundUser = await Users.findById(req.params.UserId, {_id:1, firstName:1, lastName:1, social:1});
       res.json(foundUser);

    }catch(err){
        res.json({message:err});
    }

});


// POST------------------------------------------>
router.post('/test', (req, res)=>{
// TESTING API  
    console.log(req.body);
    res.send('SUCCESS');
});


// DELETE------------------------------------------------------------>

// Delete User

router.delete('/deleteUser/:UserId',async (req,res)=>{

    try{
       const deletedUser = await Users.remove({ _id: req.params.UserId});
       res.json(deletedUser);
    }catch(err){
        res.json({message:err});
    }
});

// UPDATE-------------------------------------------------------------->

router.patch('/updateUser/:UserId',async (req,res)=>{
   
    try{
       const updatedUser = await Users.updateOne(
           { _id: req.params.UserId},
           { $set:{'email': req.body.email,
            'phone':req.body.phone,
            'social':{
                "facebook": req.body.facebook,
                "instagram":req.body.instagram,
                "youtube":req.body.youtube
            }}
        });
        console.log(updatedUser);
       res.json(updatedUser);

    }catch(err){
        res.json({message:err});
    }
});

// Exporting routes
module.exports = router;