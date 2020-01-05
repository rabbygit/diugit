var mongoose = require('mongoose')
var Schema = mongoose.Schema ;

var registerSchema = new Schema({
    Name :{
        type: String
    },
    Email:{
        type: String
    },
    Password:{
        type: String
    }
})

module.exports = mongoose.model('Register' , registerSchema)