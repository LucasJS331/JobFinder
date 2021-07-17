let express = require('express');
let app = express();
const exprehb = require('express-handlebars');
const db = require('../db/connection');
const porta = 3000;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const session = require("express-session");
const flash = require("express-flash");

// db connection

db
.authenticate()
.then(function(){
    console.log('conectou ao banco com sucesso');
}).catch((err)=>{
    console.log('ocorreu um erro ao conectar', err);
})

// basic configuration
app.use(express.urlencoded({extended: false}));
app.engine('handlebars', exprehb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//sesion configuration
app.use(session({
    secret: process.env.SECRET,
    cookie: {maxAge: 3000, secure: false},
    saveUninitialized: true,
    resave: false
}))
app.use(flash());

//routes
app.use('/', require('../routes/jobs'));


app.listen(porta, ()=>{
    console.log(' ouvindo a porta ' + porta);
});

