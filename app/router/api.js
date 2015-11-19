var User = require('../models/user');
var config = require('../../config');
var secretKey = config.secret;
var jwt = require('jsonwebtoken');

function createToken(user){

	var token = jwt.sign({
						_id: user._id,
						name:user.name,
						username:user.username
					}
					,secretKey,
					{expiresInMinute:1440});
	return token;

};

module.exports = function(app,express){
	var api = express.Router();

	api.post('/signup',function(req,res,next){
		var user = new User({
			name:req.body.name,
			username:req.body.username,
			password:req.body.password
		});

		user.save(function(err,user){
			if(err) return res.send(err);	
			res.json({message:'User has been created'});
		});
	});

	api.post('/login',function(req,res,next){
		User
			.findOne({username:req.body.username})
			.select('password')
			.exec(function(err,user){
				if(err) return res.status(500).send(err);
				if(!user) return res.status(400).send({message:"User Doesn't exists"});
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword) return res.status(400).send({message:"Password is not correct"});
				
				var token = createToken(user);
				console.log(token);

				return res.json({
							success:true,
							message:"Successfully login",
							token:token
						})

		});
	});

	api.get('/users',function(req,res,next){
		User.find({},function(err,users){
			if(err) return res.send(err);
			res.json(users);
		});	
	});

	return api;
};