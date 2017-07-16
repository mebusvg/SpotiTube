const express		= require('express');

const Router 		= express.Router();

module.exports = function(app, search)
{

	Router.route('/searchTracks/:track').get(search.searchTracks);
//	Router.route('/searchTracks/:track/:artist').get(search.searchTracks);

	return Router;

};