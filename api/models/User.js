
module.exports = {

  attributes: {

    email: { 
      type: 'string',
      required: true,
      isEmail: true,
      unique: true
    },

    password: { 
      type: 'string',       
      required: true
    }

  },

};

