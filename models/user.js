const mongoose = require('./mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type:       String,
    required:   'Укажите email',
    unique:     true,
    validate: [{
      validator: function checkEmail(value) {
        return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
      },
      msg: 'Укажите, пожалуйста, корректный email.'
    }],
    lowercase:  true, // to compare with another email
    trim:       true
  },
  displayName: {
    type:       String,
    required:   'Укажите имя',
    trim:       true
  }
}, {
  timestamps: true
});

userSchema.methods.getPublicFields = function() {
  return {
    email: this.email,
    displayName: this.displayName
  };
};

module.exports = mongoose.model('User', userSchema);
