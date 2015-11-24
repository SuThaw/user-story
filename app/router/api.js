var User = require('../models/user');
var Story = require('../models/story');
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
		var token = createToken(user);
		user.save(function(err,user){
			if(err) return res.send(err);	
			res.json({
				success:true,
				token:token,
				message:'User has been created'
			});
		});
	});

	api.post('/login',function(req,res,next){
		User
			.findOne({username:req.body.username})
			.select('password name username')

			.exec(function(err,user){
				if(err) return res.status(500).send(err);
				if(!user) return res.status(400).send({message:"User Doesn't exists"});
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword) return res.status(400).send({message:"Password is not correct"});
				
				var token = createToken(user);
				
				return res.json({
							success:true,
							message:"Successfully login",
							token:token
						})

		});
	});

	api.use(function(req,res,next){
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		if(token){
			jwt.verify(token,secretKey,function(err,decoded){
				if(err) return res.status(403).send({success:false,message:'failed to authenticate user'});
					req.decoded = decoded;
					next();
			});
		}else{
			res.status(403).send({success:false,message:'No Token Provided'});

		}
	});

	api.get('/users',function(req,res,next){
		User.find({},function(err,users){
			if(err) return res.send(err);
			res.json(users);
		});	
	});

	api
		.route('/story')
		.post(function(req,res){
			var story = new Story(
								{
									creator:req.decoded.id,
									content: req.body.content
								}
							);
			story.save(function(err,story){
				if(err) return res.status(500).send(err);
				return res.send({message:'Story has been created'});
			});

		})
		.get(function(req,res){
			Story.find({creator:req.decoded.id},function(err,stories){
				if(err) return res.status(500).send(err);
				res.json(stories);
			});
		});

	api
		.get('/me',function(req,res){
			return res.json(req.decoded);
		});

	return api;
};