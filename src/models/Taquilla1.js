const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaquillaSchema = new Schema({
    idUser: {type:String, require:true},
    ceate_at:{type:Date, default:Date.now}
})
module.exports = mongoose.model('Taquilla1', TaquillaSchema);