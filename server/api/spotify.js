const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi(
{
	clientId : 'f0722d948a8346d19afd99f625e78a52',
	clientSecret : '90560ff2e6e843ac9e7b721006ec6e5f'
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