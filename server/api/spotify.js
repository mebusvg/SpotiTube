const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi(
{
	clientId : '',
	clientSecret : ''
});

!function refreshToken()
{
	spotifyApi.clientCredentialsGrant().then(function(data)
	{
		console.log('The access token expires in ' + data.body['expires_in']);
		console.log('The access token is ' + data.body['access_token']);

		spotifyApi.setAccessToken(data.body['access_token']);
		setTimeout(refreshToken, (data.body['expires_in']*1000));
	});
}();

exports.spotifyApi = spotifyApi;