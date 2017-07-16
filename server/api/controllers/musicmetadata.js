const spotifyApi = require('../spotify').spotifyApi;

module.exports =
{
	getAlbums(req, res)
	{
		spotifyApi.getAlbums(req.params.albums).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getArtist(req, res)
	{
		spotifyApi.getArtist(req.params.artist).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getArtists(req, res)
	{
		spotifyApi.getArtists(req.params.artists).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getArtistAlbums(req, res)
	{
		spotifyApi.getArtistAlbums(req.params.artist).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getAlbumTracks(req, res)
	{
		spotifyApi.getAlbumTracks(req.params.album).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getArtistTopTracks(req, res)
	{
		spotifyApi.getArtistTopTracks(req.params.artist, 'NL').then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getAudioFeaturesForTrack(req, res)
	{
		spotifyApi.getAudioFeaturesForTrack(req.params.track).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	}
};