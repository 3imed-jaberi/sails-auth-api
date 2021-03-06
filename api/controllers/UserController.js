const Joi = require('joi');

// login controller method .. 
const login = async (req,res) => {

  try {

      const schema = Joi.object().keys({
        email : Joi.string().required().email(),
        password : Joi.string().required()
      });

      const { email , password } = await Joi.validate( req.allParams() , schema ) ;

      const user = await User.findOne({ email });
        if (!user) {
          return res.notFound({ err: 'User doesn\'t exist ' })
        }


        if (!await UtilService.comparePassword(password,user.password)) {
          return res.badRequest({err:' unauthorized - password not found ! '});
        }
        
        const token = await JWTService.generate({ user : user.id }) ;
       
      return res.ok({token}) ;
  
  } catch (err) {
    if (err.name === 'ValidationError'){
      return res.badRequest({err}) ;
    }
    return res.serverError(err) ;  
  }
 
};

// register controller method .. 
const signup = async (req,res) => {

  try {

      const schema = Joi.object().keys({
        email : Joi.string().required().email(),
        password : Joi.string().required()
      });

      const { email , password } = await Joi.validate( req.allParams() , schema ) ;

      const result = await User.create({ email , password : await UtilService.hashPassword(password) }).fetch();
        
      return res.ok(result) ;
  
  } catch (err) {
    if (err.name === 'ValidationError'){
      return res.badRequest({err}) ;
    }
    return res.serverError(err) ;  
  }
 
};

// profile controller method ( private - auth - ) .. 
const profile = (req,res) => {
  try {
    return res.ok( { msg : 'Profile Route is Works ! => Welcome to your home private routes .. ' } );
  } catch (err) {
    return res.serverError(err) ;  
  }
};

module.exports = { login , signup , profile };
