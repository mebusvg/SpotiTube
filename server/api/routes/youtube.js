const express		= require('express');

const Router 		= express.Router();

module.exports = function(app, youtube)
{

	Router.route('/search/:search').get(youtube.searchYoutube);
	Router.route('/getformats/:id').get(youtube.getMediaFormats);
	Router.route('/download/:id').get(youtube.download);

	return Router;

};