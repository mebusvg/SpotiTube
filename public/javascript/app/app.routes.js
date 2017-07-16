app.config(function($stateProvider, $urlRouterProvider)
{
	$urlRouterProvider.otherwise('/404');

	$stateProvider
	.state('root',
	{
		url: '',
		abstract: true,
		views:
		{
			'menu':
			{
				templateUrl: 'partials/menu',
				controller: 'SearchCtrl'
			},
			'side-menu':
			{
				templateUrl: 'partials/side-menu',
				controller: 'SideCtrl'
			},
			'footer':
			{
				templateUrl: 'partials/footer',
				controller: 'VideoJSplayerCtrl'
			}
		}
	})
	.state('root.home',
	{
		url: '/',
		views:
		{
			'container@':
			{
				templateUrl: 'partials/index',
				controller: 'IndexCtrl'
			}
		}
	})
	.state('root.settings',
	{
		url: '/settings',
		views:
		{
			'container@':
			{
				templateUrl: 'partials/settings',
				controller: 'SettingsCtrl'
			}
		}
	})
	.state('root.viewplaylist',
	{
		url: '/playlist/:user/:playlist',
		views:
		{
			'container@':
			{
				templateUrl: 'partials/playlist',
				controller: 'PlaylistCtrl'
			}
		}
	})
	.state('root.viewartist',
	{
		url: '/artist/:id',
		views:
		{
			'container@':
			{
				templateUrl: 'partials/artist',
				controller: 'ArtistCtrl'
			}
		}
	})
	.state('root.400',
	{
		url: '/400',
		views:
		{
			'container@':
			{
				template: '<h1>400</h1><p>Ongeldige request, u IP is gelogd.</p>'
			}
		}
	})
	.state('root.401',
	{
		url: '/401',
		views:
		{
			'container@':
			{
				template: '<h1>401</h1><p>U moet ingelogt zijn voor deze pagina.</p>'
			}
		}
	})
	.state('root.403',
	{
		url: '/403',
		views:
		{
			'container@':
			{
				template: '<h1>403</h1><p>U heeft niet genoeg rechten voor deze actie.</p>'
			}
		}
	})
	.state('root.404',
	{
		url: '/404',
		views:
		{
			'container@':
			{
				template: '<h1>404</h1><p>Onbekende pagina.</p>'
			}
		}
	})
	.state('root.500',
	{
		url: '/500',
		views:
		{
			'container@':
			{
				template: '<h1>501</h1><p>Er ging helaas wat fout, bekijk de logs voor meer informatie.</p>'
			}
		}
	})
	.state('root.501',
	{
		url: '/501',
		views:
		{
			'container@':
			{
				template: '<h1>501</h1><p>Dit werkt helaas nog niet</p>'
			}
		}
	})
	.state('root.503',
	{
		url: '/503',
		views:
		{
			'container@':
			{
				template: '<h1>503</h1><p>De website is momenteel in onderhoud.</p>'
			}
		}
	});

});