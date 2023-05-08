const User = require('../models/User')
const {StatusCodes}  = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


//REGISTER NEW USER
 const register = async (req, res) =>{
    //Get user data from the request body
   const user = await User.create({...req.body})
   //create a token
   const token = user.createJWT()
   //send response status to users including token and payload
   res.status(StatusCodes.CREATED).json({user: {username: user.username}, token})
   }  


//LOGIN A REGISTERED USER
   const login = async (req, res) => {
    //Get user login data from request body
    const {email, password} = req.body
    //check the variables collected
    if(!email || !password)
    {
      throw new BadRequestError('Please provide email and password')
    }
     //search Database for user email if it exist
     const user = await User.findOne({email})

     //check if user is not empty
    if(!user){
      throw new UnauthenticatedError('Invalid Email')
     }
     
    //compare user password with password in DB
   const isPasswordCorrect = await user.comparePassword(password)

     //check if it's true
      if(!isPasswordCorrect){
      throw new UnauthenticatedError('Invalid Password')
     }

    //create a token for this user
    const token = user.createJWT();

    //send response data to user in the front end
    res.status(StatusCodes.OK).json({user: {username:user.username}, token})
  }


  //Export functions
 module.exports = {
    register,
    login,
 }