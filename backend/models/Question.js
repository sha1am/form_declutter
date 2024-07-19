const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
	question: { type: String, required: true},
	answer: { type: String, required: true},
	keywords: [String]
});





module.exports= mongoose.model('Question', QuestionSchema);