const AutherModel= require("../models/autherModel")
const validator = require('email-validator')
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




module.exports.createauther= createauther

