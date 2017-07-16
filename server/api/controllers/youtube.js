const search 		= require('youtube-search');
const ytdl 			= require('ytdl-core');

const opts = {
	maxResults: 20,
	key: ''
};

module.exports =
{
	searchYoutube(req, res)
	{
		search(req.params.search, opts, function(error, data)
		{
			error === null ? (res.status(200).json(data)) : (res.status(500).json({message: error}));
		});
	},
	getMediaFormats(req, res)
	{


		var DASH, ITAG;
		Object.keys(req.query).length !== 0 && (
			typeof req.query.DASH !== 'undefined' && (['true', 'false'].indexOf(req.query.DASH.toLowerCase()) >= 0 && (DASH = req.query.DASH.toLowerCase()))
			);
		ytdl.getInfo(req.params.id, function(error, info)
		{
			error ? (res.status(500).json({error: error})) : (res.status(200).json({id: req.params.id, info: info.formats}));
		});
	},
	download(req, res)
	{
		const ITAG_AUDIO_VIDEO_3GP = [17, 36];
		const ITAG_AUDIO_VIDEO_MP4 = [18, 22];
		const ITAG_AUDIO_VIDEO_WEBM = [43];

		const ITAG_DASH_AUDIO_M4A = [140];
		const ITAG_DASH_AUDIO_WEBM = [171, 249, 250, 251];

		const ITAG_DASH_VIDEO_MP4 = [160, 133, 134, 135, 136, 298, 137, 299, 264, 266, 138];
		const ITAG_DASH_VIDEO_WEBM = [278, 242, 243, 244, 247, 248, 271, 313, 272, 302, 303, 308, 315, 330, 331, 332, 333, 334, 335, 336, 337];
	}
};