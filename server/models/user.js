/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import mongoose from "mongoose"
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username : {type : String, required : true},
  password : {type : String, required : true}
});

export default mongoose.model("User",userSchema);
