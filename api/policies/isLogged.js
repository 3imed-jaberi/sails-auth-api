
// like a middleware concept in EXPRESS JS .. 

module.exports = async ( req , res , next ) => {

  // check the auth in the header ..  
  if (!req.headers || !req.headers.authorization) {
    return res.badRequest({ err: ' authorization header is missing '});
  }

  // verif the jwt .. 
  const decodedToken = JWTService.verify(req.headers.authorization);
  const user = await User.findOne({ id: decodedToken.user });

  if(!user){
     next( { err : 'invalid credentials provided !' });    
  }
   
  req.user = user.id ;
  next();
};