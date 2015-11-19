var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
	creator : {
				type:Schmea.Types.ObjectId,
				ref:'User'
			},
	content: String,
	created:{type:String,default:Date.now}
});

module.exports = mongoose.model('Story',StorySchema);