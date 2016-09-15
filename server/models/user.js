/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true},
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  if(user.isModified('password') || user.isNew) {
    this.hashPassword(user.password, (err, hash) => {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

userSchema.methods.hashPassword = (candidatePassword, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    if(err) {
      return cb(err);
    }
    bcrypt.hash(candidatePassword, salt, (err, hash) => {
      if(err) {
        return cb(err);
      }
      return cb(null, hash);
    });
  });
};

userSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model('User', userSchema);
