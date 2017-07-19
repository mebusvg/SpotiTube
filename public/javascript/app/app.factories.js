app.factory('SpotifyApi', ['$resource', function($resource)
{
	return { //Seems tabbing this causes problems?
		getNewReleases: 			$resource('/api/v1/spotify/browse/getNewReleases', {}, {'query':  {method: 'GET', isArray: true}}),
		getFeaturedPlaylists:		$resource('/api/v1/spotify/browse/getFeaturedPlaylists', {}, {'query':  {method: 'GET', isArray: true}}),
		getCategories:				$resource('/api/v1/spotify/browse/getCategories', {}, {'query':  {method: 'GET', isArray: true}}),
		getCategory:				$resource('/api/v1/spotify/browse/getCategory/:category', { category: '@_category' }, {'query':  {method: 'GET', isArray: true}}),
		getPlaylistsForCategory:	$resource('/api/v1/spotify/browse/getPlaylistsForCategory/:category', { category: '@_category' }, {'query':  {method: 'GET'}}),
		getAlbums:					$resource('/api/v1/spotify/musicmetadata/getAlbums/:albums', { albums: '@_albums' }, {'query':  {method: 'GET', isArray: true}}),
		getArtist:					$resource('/api/v1/spotify/musicmetadata/getArtist/:artist', { artist: '@_artist' }, {'query':  {method: 'GET'}}),
		getArtists:					$resource('/api/v1/spotify/musicmetadata/getArtists/:artists', { artists: '@_artists' }, {'query':  {method: 'GET', isArray: true}}),
		getArtistAlbums:			$resource('/api/v1/spotify/musicmetadata/getArtistAlbums/:artist', { artist: '@_artist' }, {'query':  {method: 'GET', isArray: true}}),
		getAlbumTracks:				$resource('/api/v1/spotify/musicmetadata/getAlbumTracks/:album', { album: 'album' }, {'query':  {method: 'GET', isArray: true}}),
		getArtistTopTracks:			$resource('/api/v1/spotify/musicmetadata/getArtistTopTracks/:artist', { artist: '@_artist' }, {'query':  {method: 'GET'}}),
		getAudioFeaturesForTrack:	$resource('/api/v1/spotify/musicmetadata/getAudioFeaturesForTrack/:track', { track: '@_track' }, {'query':  {method: 'GET', isArray: true}}),
		getPlaylist:				$resource('/api/v1/spotify/playlists/getPlaylist/:user/:playlist', { user: '@_user', playlist: '@_playlist' }, {'query':  {method: 'GET'}}),
		getUserPlaylists:			$resource('/api/v1/spotify/playlists/getUserPlaylists/:user', { user: '@_user' }, {'query':  {method: 'GET', isArray: true}})
	};
}]);

app.factory('YoutubeApi', ['$resource', function($resource)
{
	return { //Seems tabbing this causes problems?
		searchYoutube: 			$resource('/api/v1/youtube/search/:search', {search: '@_search'}, {'query':  {method: 'GET', isArray: true}}),
		getFormats:				$resource('/api/v1/youtube/getformats/:id', {id: '@_id'}, {'query':  {method: 'GET', isArray: false}}),
		download:				$resource('/api/v1/youtube/download/:id', {id: '@_id'}, {'query':  {method: 'GET', isArray: true}})
	};
}]);

app.factory('httpErrorInterceptor', ['$q', '$injector', '$window', '$location', function ($q, $injector, $window, $location)
{
	return { //Seems tabbing this causes problems?
		request: function(config)
		{
			var canceler = $q.defer();
			$location.search()._escaped_fragment_ == '' && (config.timeout = canceler.promise, canceler.resolve());
//			console.log($location.path());
			return config;
		},
		response: function(response)
		{
			return response;
		},
		responseError: function(response)
		{
			response.status === 400 && $injector.get('$state').go('root.400');
			response.status === 403 && $injector.get('$state').go('root.403');
			response.status === 404 && $injector.get('$state').go('root.404');
			response.status === 503 && $injector.get('$state').go('root.500');
			response.status === 503 && $injector.get('$state').go('root.503');
			return response || $q.when(response);
		}
	};
}]);

app.factory('PlaylistServiceV2', function()
{
	return {
		playlists: {},
		currentPlaylistId: '',
		VQL: '',
		songInfo: {},
		prev: function()
		{
			this.currentPlaylistId != '' && (this.playlists[this.currentPlaylistId].index > 0 && (this.playlists[this.currentPlaylistId].index--, this.setSongInfo()));
		},
		next: function()
		{
			this.currentPlaylistId != '' && (this.playlists[this.currentPlaylistId].index < Object.keys(this.playlists[this.currentPlaylistId].tracks).length-1 ? (this.playlists[this.currentPlaylistId].index++, this.setSongInfo()) : (this.playlists[this.currentPlaylistId].index = 0, this.setSongInfo()));
		},
		setIndex: function(index)
		{
			this.currentPlaylistId != '' && (this.playlists[this.currentPlaylistId].index = index);
		},
		setSongInfo: function(info)
		{
			info == undefined ? (this.songInfo = {
				image: this.playlists[this.currentPlaylistId].tracks[this.playlists[this.currentPlaylistId].index].track.album.images[2].url,
				artist: this.playlists[this.currentPlaylistId].tracks[this.playlists[this.currentPlaylistId].index].track.artists,
				title: this.playlists[this.currentPlaylistId].tracks[this.playlists[this.currentPlaylistId].index].track.name,
				search: this.playlists[this.currentPlaylistId].tracks[this.playlists[this.currentPlaylistId].index].track.artists[0].name + ' - ' + this.playlists[this.currentPlaylistId].tracks[this.playlists[this.currentPlaylistId].index].track.name	
			}) : (this.songInfo = {
				image: info.album.images[2].url,
				artist: info.artists,
				title: info.name,
				search: info.artists[0].name + ' - ' + info.name		
			});
		},
		getSongInfo: function()
		{
			return this.songInfo;
		}
	}
});

app.factory('PlayerServiceV2', function(YoutubeApi, $filter, PlaylistServiceV2, YoutubeService)
{
	var PlayerServiceV2 = function(search)
	{

		this.NON_DASH_AUDIO_VIDEO = [17, 36, 18, 22, 43];

		this.ITAG_DASH_AUDIO_M4A = [139, 140];
		this.ITAG_DASH_VIDEO_MP4 = [160, 133, 134, 135, 136, 298, 137, 299, 264, 266, 138];

		this.ITAG_DASH_AUDIO = [139, 249, 250, 140, 171, 251]

		this.ITAG_DASH_AUDIO_WEBM = [171, 249, 250, 251];
		this.ITAG_DASH_VIDEO_WEBM = [278, 242, 243, 244, 247, 248, 271, 313, 272, 302, 303, 308, 315, 330, 331, 332, 333, 334, 335, 336, 337];

		this.NON_DASH = false;

		this.VIDEO = [];
		this.AUDIO = [];

		search != undefined && (this.search = search);

		this.mainplayer = videojs('mainplayer').ready(function()
		{
			var videoplayer = videojs('videoplayer');
			var SEEKING = false;
			this.on('loadeddata', function()
			{
				this.play();
			});
			this.on('volumechange', function()
			{
				videoplayer.volume(this.volume());
			});
			videoplayer.on('seeking', function()
			{
				SEEKING = true;
			});
			videoplayer.on('seeked', function()
			{
				SEEKING = false;
			});
			this.on('timeupdate', function()
			{
				SEEKING && (videoplayer.currentTime()-this.currentTime() > 5 && (this.currentTime(videoplayer.currentTime())));
				SEEKING && (this.currentTime()-videoplayer.currentTime() > 5 && (this.currentTime(videoplayer.currentTime())));
				videoplayer.isFullscreen() && (videoplayer.currentTime()-this.currentTime() > 0.075 && (videoplayer.currentTime(this.currentTime())), this.currentTime()-videoplayer.currentTime() > 0.075 && (videoplayer.currentTime(this.currentTime())));
			});
			return this;
		});
		this.videoplayer = videojs('videoplayer').ready(function()
		{
			var mainplayer = videojs('mainplayer');
			this.on('volumechange', function()
			{
				mainplayer.volume(this.volume());
			});
			this.on('timeupdate', function()
			{
				this.isFullscreen() ? (this.paused() ? (mainplayer.pause()) : (mainplayer.play())) : (this.pause());
			});
			return this;
		});
		$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function()
		{
			document.webkitCurrentFullScreenElement === null ? ($('#videoplayer').css('display', 'none')) : ($('video:eq(1)').css('display', 'block'), $('#videoplayer').css('display', 'block')); // isFullscreen() doesn't see the escape key thinking it is still in fullscreen while it's not.
		});
	}
	PlayerServiceV2.prototype.findSong = function()
	{
		self=this;
		self.search == undefined ? (search = PlaylistServiceV2.getSongInfo().search) : (search = self.search);
		YoutubeApi.searchYoutube.query({search: search}, function(results)
		{
			YoutubeApi.getFormats.query({id: results[0].id}, function(results)
			{
				self.setFormats(results.info);
			});
		});
	}
	PlayerServiceV2.prototype.togglePlay = function()
	{
		this.mainplayer.paused() ? (this.mainplayer.play(), this.videoplayer.isFullscreen() && (this.videoplayer.play()), this.paused = false) : (self.pause(), this.paused = true);
	}
	PlayerServiceV2.prototype.fullscreen = function()
	{
		self.NON_DASH ? (self.mainplayer.isFullscreen() ? (self.mainplayer.exitFullscreen()) : (self.mainplayer.src(self.VIDEO.slice(-1).pop()[0].url), self.mainplayer.requestFullscreen())) : (self.videoplayer.isFullscreen() ? (self.videoplayer.exitFullscreen()) : (self.videoplayer.src(self.VIDEO.slice(-1).pop()[0].url), self.videoplayer.play(), self.videoplayer.requestFullscreen()));
	}
	PlayerServiceV2.prototype.play = function()
	{
		this.findSong();
	}
	PlayerServiceV2.prototype.pause = function()
	{
		this.mainplayer.pause();
		this.videoplayer.isFullscreen() && (this.videoplayer.pause());
	}
	PlayerServiceV2.prototype.next = function()
	{
		YoutubeService.search = false;
		PlaylistServiceV2.currentPlaylistId != '' && (PlaylistServiceV2.next(), this.findSong());
	}
	PlayerServiceV2.prototype.prev = function()
	{
		YoutubeService.search = false;
		PlaylistServiceV2.currentPlaylistId != '' && (PlaylistServiceV2.prev(), this.findSong());
	}
	PlayerServiceV2.prototype.setFormats = function(formats)
	{
		self=this;
		self.NON_DASH = false;
		self.VIDEO = [];
		self.AUDIO = [];
		angular.forEach(self.ITAG_DASH_AUDIO, function(itag, index)
		{
			$filter('filter')(formats, {itag: itag}).length != 0 && (self.AUDIO.push($filter('filter')(formats, {itag: itag})));
		});
		angular.forEach(self.ITAG_DASH_VIDEO_WEBM, function(itag, index)
		{
			$filter('filter')(formats, {itag: itag}).length != 0 && (self.VIDEO.push($filter('filter')(formats, {itag: itag})));
		});
		self.VIDEO.length == 0 && (angular.forEach(self.ITAG_DASH_VIDEO_MP4, function(itag, index)
		{
			$filter('filter')(formats, {itag: itag}).length != 0 && (self.VIDEO.push($filter('filter')(formats, {itag: itag})));
		}));
		self.AUDIO.length == 0 && (angular.forEach(self.NON_DASH_AUDIO_VIDEO, function(itag, index)
		{
			console.log('NON_DASH')
			$filter('filter')(formats, {itag: itag}).length != 0 && (self.VIDEO.push($filter('filter')(formats, {itag: itag})));
		}));
		self.AUDIO.length != 0 ? (self.mainplayer.src(self.AUDIO.slice(-1).pop()[0].url)) : (this.NON_DASH = true, console.log('NON_DASH'), self.mainplayer.src(self.VIDEO.slice(-1).pop()[0].url));
		self.AUDIO.length != 0 && (self.videoplayer.isFullscreen() && (self.videoplayer.src(self.VIDEO.slice(-1).pop()[0].url), self.videoplayer.play()));
		PlaylistServiceV2.VQL = self.VIDEO;
	}
	return PlayerServiceV2;
});

app.factory('YoutubeService', function(YoutubeApi, $filter)
{
	return {
		search: false,
		info: ''
	}
});

app.factory('ConfigService', function()
{
	return {
		video: false
	}
});