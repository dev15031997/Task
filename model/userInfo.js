const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
})

const addressSchema =new  mongoose.Schema({
    house:{
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

  });

const User = mongoose.model('User', userSchema);
const Address = mongoose.model('Address', addressSchema);

module.exports = {User,Address};