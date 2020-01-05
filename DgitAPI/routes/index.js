var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Register = require('../models/register')
var Project = require('../models/project')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Something from localhost:3000.")
});

router.post('/addRegister' , function(req,res){
  console.log(req.body, 'req body');

  Register.find({Email : req.body.Email} )
    .exec()
    .then(user => {
      if(user.length >= 1){
        return res.status(409).json({
          success : false ,
          msg : "Mail exits"
        })
      }else{
        bcrypt.genSalt(10 , (err,salt) =>{
          bcrypt.hash(req.body.Password , salt , (err , hash) => {
            if(err){
              return res.status(500).json({
                  success : false , 
                  msg : 'Failed to register'
                })
            }else{
              var register = new Register({
                Name : req.body.Name,
                Email : req.body.Email,
                Password : hash 
              })
              register.save(function(err,data){
                if(err){
                  return res.json({ 
                    success : false , 
                    msg : 'Failed to register'
                  })
                }else{
                  console.log('User registered' , data);
                  return res.json({ 
                    success : true , 
                    msg : 'User registered'
                  })
                }
              })
            }
          })
        })
      }
    })
})

router.post('/login' , function(req,res){
  console.log(req.body)
  Register.findOne({Email : req.body.Email} , (err,user) =>{
    if(err){
      throw err;
    }
    if(!user){
      return res.json({
        success: false,
        msg : "User not found."
      })
    }
    bcrypt.compare(req.body.Password , user.Password , (err,isMatch) => {
      if(err){
        throw err ;
      }
      if(isMatch){
        const token = jwt.sign( {
          Email : user.Email,
          id : user._id
        } , 
        'secret' , 
        { expiresIn : '1h'});
        return res.json({
          success : true,
          token :  'bearer '+token,
            user : {
              id : user._id,
              Name : user.Name ,
              Email : user.Email
            }
          })
        }else{
          return res.json({
            success : false ,
            msg : "Wrong Password."
          })
        }
      })
  })
})

router.post('/addProject' , function(req,res,next){
  var project = new Project({
    ProjectName : req.body.ProjectName,
    ProjectType : req.body.ProjectType,
    UsedLanguage : req.body.UsedLanguage,
    GitHubLink   : req.body.GitHubLink,
    ContributorName : req.body.ContributorName,
    ContributorEmail : req.body.ContributorEmail
  })
  project.save(function(err,data){
    if(err){
      console.log(err)
    }else{
      console.log(data)
      return res.json({
        success : true,
        msg : "New project Added."
      })
    }
  })
})

router.get('/getProject' , function(req,res){
  console.log("hello from getProject")
  Project.find((err,data)=>{
    if(err){
      return res.status(404).json({
        success: false,
        msg : "Failed to get Project"
      })
    }else{
      console.log(data)
      return res.json(data)
    }
  })
})

module.exports = router;
