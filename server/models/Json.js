const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//데이터베이스 형식같은거임
const jsonSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description : {
        type: String
    },
    filePath : {
        type: String
    },
    jsonText: {
        type: String
    },
    realName: {
        type: String
    }
},{timestamps: true})

const Json = mongoose.model('Json', jsonSchema)

module.exports = { Json }