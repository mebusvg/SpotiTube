(function()
{
	const express		= require('express');
	const path			= require('path');
	const bodyParser 	= require('body-parser');
	const compression	= require('compression');

	const API 			= require('./api/');
	const PARTIALS 		= require('./partials');

	const app			= express();
	const port			= process.env.PORT;

	//Security reasons, kappa
	app.disable('x-powered-by');

	app.use(express.static(path.join(__dirname, '../public')));

	app.use('/api', API.app);

	app.get('*', function(req, res, next)
	{
		req.xhr == true ? (next()) : (res.sendFile(path.join(__dirname, '../public/index.html')));
	});

	app.use('/partials', PARTIALS.app);

	app.use(function(req, res, next)
	{
		var error = new Error('Not Found');
		error.status = 404;
		next(error);
	});

	app.get('env') === 'development' ? (app.use(function(error, req, res)
	{
		res.status(error.status).send(error.message);
	})) : (app.use(function(error, req, res)
	{
		res.status(error.status).send(error.message);
	}));

	app.listen(port, function()
	{
		console.log('Server gestart op poort: ' + port);
	});

	module.exports = app;
}());
