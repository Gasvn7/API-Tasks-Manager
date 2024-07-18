const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.singup = async (req,res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(404).send({ error: 'No se hayó ningun usuario. Intente de nuevo.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
      return res.status(400).send({ error: 'Contraseña incorrecta. Intente de nuevo.' });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
}