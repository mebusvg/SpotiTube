const express		= require('express');

const Router 		= express.Router();

module.exports = function(app, playlists)
{

	Router.route('/getPlaylist/:user/:playlist').get(playlists.getPlaylist);
	Router.route('/getUserPlaylists/:user').get(playlists.getUserPlaylists);

	return Router;

};