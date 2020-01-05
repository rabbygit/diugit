var mongoose = require('mongoose')
var Schema = mongoose.Schema ;

var projectSchema = new Schema({
    ProjectName:{
        type: String
    },
    ProjectType:{
        type: String
    },
    UsedLanguage:{
        type: String
    },
    GitHubLink:{
        type: String
    },
    ContributorName:{
        type: String
    },
    ContributorEmail:{
        type : String
    }
})

module.exports = mongoose.model('Project' , projectSchema)