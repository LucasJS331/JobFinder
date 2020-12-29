let express = require('express');
let app     = express();
const exprehb = require('express-handlebars');
const db    = require('./db/connection');
const porta = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const { dirname } = require('path');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// db connection

db
.authenticate()
.then(function(){
    console.log('conectou ao banco com sucesso');
}).catch((err)=>{
    console.log('ocorreu um erro ao conectar', err);
})

// body- parser

app.use(bodyParser.urlencoded({extended: false}));

// handle-bars

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exprehb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder

app.use(express.static(path.join(__dirname,'public')))

// routes
app.get('/', (req, res)=>{

    let search =  req.query.job;
    let query  = '%'+search + '%';

    if(!search){

        console.log('foi');
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]}).then((jobs =>{
            
            res.render('index', {
                jobs
            })
    
        })).catch((err)=>{
            console.log(err);
        })
    } else{
        Job.findAll({
            where: {titulo:  {[Op.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]}).then((jobs =>{
            
            res.render('index', {
                jobs, search
            })
    
        })).catch((err)=>{
            console.log(err);
        })
    }
});




// ouvindo a porta 
app.listen(porta, ()=>{
    console.log(' ouvindo a porta ' + porta);
});


// jobs routes

app.use('/jobs', require('./routes/jobs'));