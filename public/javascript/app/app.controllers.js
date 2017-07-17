app.controller('IndexCtrl', function($scope, SpotifyApi, YoutubeApi, PlaylistServiceV2)
{
	$scope.toplists = SpotifyApi.getPlaylistsForCategory.query({ category: 'toplists'});
}).controller('SettingsCtrl', function()
{

}).controller('SearchCtrl', function($scope, PlayerServiceV2, YoutubeApi, YoutubeService)
{
	$scope.gYV = function(value)
	{
		return YoutubeApi.searchYoutube.query({search: value}, function(response)
		{
			return response;
		}).$promise;
	};
	$scope.onSelect = function ($item, $model, $label)
	{
		YoutubeService.search = true;
		YoutubeService.info = $item;
		new PlayerServiceV2($item.title).play();
	};
}).controller('SideCtrl', function($scope, PlayerServiceV2, YoutubeApi, YoutubeService)
{



}).controller('PlaylistCtrl', function($scope, SpotifyApi, $stateParams, PlayerServiceV2, YoutubeService, PlaylistServiceV2)
{
	$scope.playlist = SpotifyApi.getPlaylist.query({ user: $stateParams.user, playlist: $stateParams.playlist}, function(response)
	{
		$scope.playlist = response.tracks.items;
		$scope.playlistname = response.name;

		PlaylistServiceV2.playlists[$stateParams.playlist] = {index: 0, name: response.name, tracks: response.tracks.items};
	});

	$scope.play = function(index, search)
	{
		PlaylistServiceV2.currentPlaylistId = $stateParams.playlist;
		YoutubeService.search = false;
		PlaylistServiceV2.setIndex(index);
		PlaylistServiceV2.setSongInfo();
		new PlayerServiceV2().play();
	}
}).controller('ArtistCtrl', function($scope, SpotifyApi, $stateParams, PlaylistServiceV2, PlayerServiceV2, YoutubeService)
{
	$scope.artistinfo = SpotifyApi.getArtist.query({ artist: $stateParams.id});
	$scope.artisttoptracks = SpotifyApi.getArtistTopTracks.query({ artist: $stateParams.id});

	$scope.play = function(index, search)
	{
		YoutubeService.search = false;
		PlaylistServiceV2.setSongInfo($scope.artisttoptracks.tracks[index]);
		new PlayerServiceV2(search).play();
	}

}).controller('VideoJSplayerCtrl', function($scope, YoutubeService, PlayerServiceV2, PlaylistServiceV2)
{
	var player = new PlayerServiceV2();

	player.mainplayer.on('ended', function()
	{
		player.next();
	});

	player.videoplayer.on('ended', function()
	{
		player.next();
	});
	
	$scope.$watch(function()
	{
		return PlaylistServiceV2.getSongInfo();
	}, function(newVal, oldVal)
	{
		$scope.songInfo = PlaylistServiceV2.getSongInfo();
	});
	$scope.$watch(function()
		{
		return YoutubeService.info;
	}, function(newVal, oldVal)
	{
		YoutubeService.search && ($scope.songInfo = {image: YoutubeService.info.thumbnails.default.url, artist: [], title: YoutubeService.info.title});
	});

	Mousetrap.bind(['f'], () => {
		player.fullscreen();
	});
	Mousetrap.bind(['space'], () => {
		player.videoplayer.isFullscreen() && (player.togglePlay());
	});

	$scope.prevSong = function()
	{
		YoutubeService.search = false;
		player.prev();
	};
	$scope.nextSong = function()
	{
		YoutubeService.search = false;
		player.next();
	};
	$scope.togglePlayButton = function()
	{
		player.togglePlay();
	};
	$scope.toggleVideo = function()
	{
		player.fullscreen();
	}

	typeof window.process != 'undefined' && ((function()
	{
		const {ipcRenderer} = require('electron');
		var player = new PlayerServiceV2();
		ipcRenderer.on('PlayPause', (event, arg) =>
		{
			player.togglePlay();
		});
		ipcRenderer.on('Prev', (event, arg) =>
		{
			YoutubeService.search = false;
			player.prev();
		});
		ipcRenderer.on('Next', (event, arg) =>
		{
			YoutubeService.search = false;
			player.next();
		});
	})());
});