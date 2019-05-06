const Joi = require('joi');

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
        
        const token = JWTService.generate({ user : user.id } , '1 day' ) ;
      
      return res.ok({token}) ;
  
  } catch (err) {
    if (err.name === 'ValidationError'){
      return res.badRequest({err}) ;
    }
    return res.serverError(err) ;  
  }
 
};

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

const profile = (req,res) => {
  try {
    return res.ok( { msg : 'Profile Private route is work !' } );
  } catch (err) {
    return res.serverError(err) ;  
  }
};

module.exports = { login , signup , profile };
