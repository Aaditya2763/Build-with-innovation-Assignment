const jwt=require('jsonwebtoken')
const mykeys=process.env.JWT_KEY;



const generateToken=id=>{

   try {
  return jwt.sign({id},mykeys,{expiresIn:"10d"} )
   } catch (error) {
    console.log(error)
   } 
} 


module.exports=generateToken;