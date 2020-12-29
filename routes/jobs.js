const express = require('express');
const router = express.Router();
const Job    = require('../models/Job');


router.get('/test', (req,res)=>{
    res.send('deu certo');
})

router.get('/add', (req, res)=>{
  res.render('add');
})


// rota de vizualizar vaga
router.get('/view/:id', (req,res)=> Job.findOne({
  where: {id: req.params.id}
}).then((job)=>{
  res.render('view', {
    job
  })
}).catch((err)=>{
  console.log(err);
}))


router.post('/add', (req,res)=>{
  let {titulo, salary, company, email, description, new_job}=  req.body;

  Job.create({ 
    titulo,
    salary,
    company,
    email,
    description,
    new_job

  }).then(()=>{
      res.redirect('/');
  }).catch((err)=>{
      console.log(err);
  })
})

module.exports = router;