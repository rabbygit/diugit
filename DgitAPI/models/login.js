var mongoose = require('mongoose')
var Schema = mongoose.Schema ;

var loginSchema = new Schema({
    Email:{
        type: String
    },
    Password:{
        type: String
    }
})

module.exports = mongoose.model('Login' , loginSchema)