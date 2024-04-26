const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imagen: { type: String, required: false },
  rol: { type: String, enum: ['usuario', 'administrador'], default: 'administrador' },
  resetPassword: {
    token: { type: String },
    expires: { type: Date }
  },
  verificationToken: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
