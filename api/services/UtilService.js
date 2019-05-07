const bcrypt = require('bcrypt');


// crypt the password .. 
const hashPassword = async (password) => {
   return await bcrypt.hash(password, 10);
}

// compare the crypted password with the new input password ! .. 
const comparePassword = async (password , hash) => {
  return await bcrypt.compare(password, hash) ;
}

module.exports = { hashPassword , comparePassword }