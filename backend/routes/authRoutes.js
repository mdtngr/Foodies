// Imports
const router                  = require('express').Router();
const User                    = require('../models/UserModel');
const { registerValidation,
   loginValidation}           = require('../validation/Validation') 
const bcrypt                  = require('bcryptjs');
const jwt                     = require('jsonwebtoken')

router.post('/register', async (req,res)=>{

  console.log(req);

  // Validating the req body
  const {error} = registerValidation(req.body);
  if(error)
  {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user already exists
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist)
    {
      return res.status(400).send("Email already exists");
    }

  // Hashing the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Creating a new user object
    const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            phone: req.body.phone,
                            password: hashedPassword,
                            social: {
                              facebook: req.body.facebook,
                              instagram: req.body.instagram,
                              youtube: req.body.youtube
                          },
                            dateJoined: req.body.dateJoined
    });
    try{
          const savedUser = await user.save();
          res.status(200).send(savedUser);
      
    }catch(err){
                  res.status(400).send(err);
      }
  });


router.post('/login', async (req,res)=>{

  // Validating the req body
  const {error} = loginValidation(req.body);
  
  if(error)
  {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user already exists
  const user = await User.findOne({email: req.body.email});
  if (!user)
    {
      return res.status(400).send("Email or password is incorrect");
    }

    // Check if email & password match
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(validPass)
    {
      // Creating and assigning a token
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET,{ expiresIn: '1h' });
      return res.header('auth-token', token).send(token);
      // return res.status(200).send('Login Success');
    }
    else{
       return res.status(400).send('Invalid Password');
    }
});

module.exports = router;