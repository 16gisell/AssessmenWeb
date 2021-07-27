if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
//librerias 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//inicializacion
const app = express();
require ('./dataBase');

//midelwares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//rutas APIS
app.use('/api/users', require('./routes/users'));
app.use('/api/taquilla1', require('./routes/taquilla1'));
app.use('/api/taquilla2', require('./routes/taquilla2'));


//settings
app.set('port', process.env.PORT || 3000);

//start server
app.listen(app.get('port'), ()=>{
    console.log('serve on port', app.get('port'));
});

