/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	restricted:function(req,res){
		return res.ok("If You can see this you are authenticated");
	},	
	open:function(req,res){
		return res.ok("This is open to all!!!");
	},
	jwt:function(req,res){
		return res.ok("Yeah you are have json web token right? ");
	}
};

