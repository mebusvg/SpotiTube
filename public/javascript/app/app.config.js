app.config(function($locationProvider, $httpProvider)
{
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.interceptors.push('httpErrorInterceptor');
});
