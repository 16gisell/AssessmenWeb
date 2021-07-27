const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Taquilla2Schema = new Schema({
    idUser:{type:String, require: true},
    create_at:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Taquilla2', Taquilla2Schema);