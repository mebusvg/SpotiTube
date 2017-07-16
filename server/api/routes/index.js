const express		= require('express');

const Router 		= express.Router();

const Maintenance	= false;

module.exports = function(app)
{

	Router.route('/').get(function(req, res, next)
	{
		Maintenance ? (res.sendStatus(503)) : (next());
	});

	return Router;

};