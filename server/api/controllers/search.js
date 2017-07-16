const spotifyApi = require('../spotify').spotifyApi;

module.exports =
{
	searchTracks(req, res)
	{
		spotifyApi.searchTracks(req.params.track).then(function(data)
		{
			res.status(200).json(data.body);
		}, function(error)
		{
			res.status(500).json({message: error});
		});
	}
};