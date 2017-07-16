const express		= require('express');

const Router 		= express.Router();

module.exports = function(app, browse)
{

	Router.route('/getNewReleases').get(browse.getNewReleases);
	Router.route('/getFeaturedPlaylists').get(browse.getFeaturedPlaylists);
	Router.route('/getCategories').get(browse.getCategories);
	Router.route('/getCategory/:category').get(browse.getCategory);
	Router.route('/getPlaylistsForCategory/:category').get(browse.getPlaylistsForCategory);

	return Router;

};