/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
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
/*
userSchema.pre('save', (next) => {
  console.log(this);
  const user = this;
  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) {
          return next(err);
        }
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = (pw, cb) => {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
*/
export default mongoose.model('User', userSchema);
