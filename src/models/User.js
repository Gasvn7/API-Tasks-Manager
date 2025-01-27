const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 7,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
},{
  timestamps: true
});

userSchema.pre('save', async function(next) {
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 9);
  }
  next();

});

// Método para generar Tokens para el usuario
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;