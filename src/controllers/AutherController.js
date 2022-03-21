const AutherModel= require("../models/autherModel")
const validator = require('email-validator')
const jwt = require("jsonwebtoken")


const createauther= async function (req, res) {
    try{
    let data= req.body
    let email = data.email
    let validateEmail = validator.validate(email)
    if (validateEmail){
    let savedData= await AutherModel.create(data)
    return res.status(201).send({msg: savedData})
}
    }


catch(err){
    return res.status(500).send({error:err.message})
}
}







const loginAuther = async function (req, res) {
   // try {
      let autherEmail = req.body.email;
      let password = req.body.password;
      
  
      let auther = await AutherModel.findOne({ email: autherEmail, password: password });
      if (!auther)
        return res.status(400).send({
          status: false,
          msg: "auther Email or the password is not corerct",
        });
      let token = jwt.sign(
        { autherID: auther._id.toString() }, 'Ankit-thorium'
      );
      res.setHeader("x-api-key", token);
      return res.status(201).send({ status: true, data: token });
    // }
   // catch (err) {
      //  console.log("This is the error :", err.message)
  //    return res.status(500).send({ msg: "Error", error: err.message })
    //}
  }

  module.exports.createauther= createauther
  module.exports.loginAuther = loginAuther