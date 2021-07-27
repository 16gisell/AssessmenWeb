//libreria
const mongoose = require('mongoose');
console.log('mongodb://localhost/AssassesmentWeb')

//coneccion
mongoose.connect('mongodb://localhost/AssassesmentWeb',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(db=>console.log('conectados a la base de datos'))
    .catch(err =>console.log(err, ('error al conectar con la base de datos')))