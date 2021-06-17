const express = require('express');
const router = express.Router();
const { isUserLoggedIn, isUserAuthor } = require('../middlewares/userMiddlewares');

// Importing Schemas from models
const Post= require('../models/PostModel')

// ROUTES

// @ GET----------------------------------------------->

// Gets all Posts
router.get('/allPosts',isUserLoggedIn,async (req, res)=>{

    try{
        const allPosts = await Post.find();
        res.json(allPosts);

    }catch(err){
        res.json({message:err});
    }

});

router.get('/allPostData',async (req, res)=>{

    try{
        const allPosts = await Post.find();
        res.json(allPosts);

    }catch(err){
        res.json({message:err});
    }

});



// Find post with particular post ID
router.get('/:postId',isUserLoggedIn, async (req, res)=>{

    try{
       const findPost = await Post.findById(req.params.postId);
       res.json(findPost);

    }catch(err){
        res.json({message:err});
    }

});


// @ POST----------------------------------------------->
router.post('/TEST', (req, res)=>{
// TESTING API  
    console.log(req.body);
    res.send('SUCCESS');
});

// Creates a new Post
router.post('/newPost',isUserLoggedIn, async (req, res)=>{
// Creating a new post

const newPost = new Post({
    title : req.body.title,
    description : req.body.description,
    url: req.body.url,
    author: req.user._id,
    uploadDate: req.body.uploadDate
});

try{
const savedPost = await newPost.save();
res.json(savedPost);
}catch(err){
    res.json({message:err});
}
});


// @ DELETE----------------------------------------------->

// Delete Post
router.delete('/deletePost/:postId',isUserLoggedIn, isUserAuthor, async (req,res)=>{
    
    try{
       const deletedPost = await Post.remove({ _id: req.params.postId});
       res.json(deletedPost);
    }catch(err){
        res.json({message:err});
    }
});


// @ UPDATE----------------------------------------------->

router.patch('/updatePost/:postId',isUserLoggedIn,isUserAuthor,async (req,res)=>{
   
    try{
       const updatedPost = await Post.updateOne(
           { _id: req.params.postId},
           { $set:{'title': req.body.title, 'description':req.body.description}
        });
       res.json(updatedPost);
    }catch(err){
        res.json({message:err});
    }
});

// Exporting routes
module.exports = router;