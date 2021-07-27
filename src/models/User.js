const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id_user:{type:String, require: true},
    nameUser:{type:String, require:true},
    action:{type:String, require:true},
    create_at:{type:Date, default:Date.now}
});
module.exports = mongoose.model('User', UserSchema);