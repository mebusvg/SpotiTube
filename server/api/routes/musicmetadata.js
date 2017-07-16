const express		= require('express');

const Router 		= express.Router();

module.exports = function(app, musicmetadata)
{

	Router.route('/getAlbums/:albums').get(musicmetadata.getAlbums);
	Router.route('/getArtist/:artist').get(musicmetadata.getArtist);
	Router.route('/getArtists/:artists').get(musicmetadata.getArtists);
	Router.route('/getArtistAlbums/:artist').get(musicmetadata.getArtistAlbums);
	Router.route('/getAlbumTracks/:album').get(musicmetadata.getAlbumTracks);
	Router.route('/getArtistTopTracks/:artist').get(musicmetadata.getArtistTopTracks);
	Router.route('/getAudioFeaturesForTrack/:track').get(musicmetadata.getAudioFeaturesForTrack);

	return Router;

};