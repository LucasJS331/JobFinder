const Job = require("../models/Job");
const validator = require("validator");

class JobController {
    index(req,res){
        let search =  req.query.job;
        let query  = '%'+search + '%';      

        if(!search){
     
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
    }
    createJobPage(req, res){
        // leitura das flash mensages
       let titleError = req.flash("titleError");
       let titleValue = req.flash("titleValue");
       let emailError = req.flash("emailError");
       let emailValue = req.flash("emailValue");
       let descriptionError =  req.flash("descriptionError");
       let descriptionValue = req.flash("descriptionValue");
       let salaryError = req.flash("salaryError");
       let salaryValue = req.flash("salaryValue");
       let companyError = req.flash("companyError");
       let companyValue =  req.flash("companyValue");

    if(titleError == undefined || titleError.length == 0){
        titleError = "";
    }

    
    if(titleValue == undefined || titleValue.length == 0){
        titleValue = "";
    }

    if(descriptionError == undefined || descriptionError.length == 0){
        descriptionError = "";
    }

    if(descriptionValue == undefined || descriptionValue.length == 0){
        descriptionValue = "";
    }

    if(emailError == undefined || emailError.length == 0){
        emailError = "";
    }

    if(emailValue == undefined || emailValue.length == 0){
        emailValue = "";
    }

    if(salaryError == undefined || salaryError.length == 0){
        salaryError = "";
    }

    
    if(companyError == undefined || companyError.length == 0){
        companyError = "";
    }

    if(salaryValue == undefined || salaryValue.length == 0){
        salaryValue = "";
    }

    
    if(companyValue == undefined || companyValue.length == 0){
        companyValue = "";
    }

    res.render("add", {
         titleError,
         titleValue,
         descriptionValue,
         descriptionError,
         emailValue,
         emailError,
         salaryError,
         salaryValue,
         companyError,
         companyValue,
        });

      
    }

    viewJob(req,res){
        
        Job.findOne({
            where: {id: req.params.id}
          })
          .then((job)=>{
            res.render('view', {
              job
            })
          })
          .catch((err)=>{
            console.log(err);
          })
    }

    addJob(req,res){
        let {title, salary, company, email, description, new_job}=  req.body;

        let titleError;
        let emailError;
        let salaryError;
        let companyError;
        let descriptionError;

    
        if(salary == undefined || salary.trim() == ""){
            salaryError = "descrição invalida!";
        
        }

        if(title == undefined || title.trim()== ""){
            titleError = "titulo invalido!"
        }

        if(company == undefined || company.trim() == ""){
            companyError = "nome de empresa invalido!";
        
        }

        if(description == undefined || description.trim() == ""){
            descriptionError = "descrição invalida!";
        }

        if(!validator.isEmail(email)){
            emailError = "email invalido!"
        }

        if(emailError != undefined || descriptionError != undefined || titleError != undefined || salaryError != undefined || companyError != undefined){
            req.flash("titleError", titleError);
            req.flash("titleValue", title);
            req.flash("emailError", emailError);
            req.flash("emailValue", email);
            req.flash("descriptionError", descriptionError);
            req.flash("descriptionValue", description);
            req.flash("salaryError", salaryError);
            req.flash("salaryValue", salary);
            req.flash("companyError", companyError);
            req.flash("companyValue", company);
            res.redirect("/add");
            return;
        }
      

        Job.create({ 
          title,
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
    }

}

module.exports = new JobController();