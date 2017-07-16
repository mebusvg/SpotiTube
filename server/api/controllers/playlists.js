const spotifyApi = require('../spotify').spotifyApi;

module.exports =
{
	getPlaylist(req, res)
	{
		spotifyApi.getPlaylist(req.params.user, req.params.playlist).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	},
	getUserPlaylists(req, res)
	{
		spotifyApi.getUserPlaylists(req.params.user).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		})
	}
};