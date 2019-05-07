
require('dotenv').config();

const jwt = require('jsonwebtoken');

// generate the token .. 
const generate = ( payload ) =>  jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: "24h" } );

// verify the token .. 
const verify = (token) => jwt.verify(token ,  process.env.JWT_SECRET ) ;


module.exports = { generate , verify } ;