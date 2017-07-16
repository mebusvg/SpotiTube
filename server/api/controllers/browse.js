const spotifyApi = require('../spotify').spotifyApi;

module.exports =
{
	getNewReleases(req, res)
	{
		spotifyApi.getNewReleases({country: 'NL'}).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getFeaturedPlaylists(req, res)
	{
		spotifyApi.getFeaturedPlaylists({country: 'NL', 'locale': 'nl_NL'}).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getCategories(req, res)
	{
		spotifyApi.getCategory({country: 'NL', 'locale': 'nl_NL'}).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getCategory(req, res)
	{
		console.log(req.params.category);
		spotifyApi.getCategory(req.params.category, {country: 'NL', 'locale': 'nl_NL'}).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getPlaylistsForCategory(req, res)
	{
		spotifyApi.getPlaylistsForCategory(req.params.category, {country: 'NL'}).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	}
};