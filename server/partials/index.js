const express		= require('express');
const path			= require('path');

const app			= express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/:partial', function(req, res, next)
{
	res.render(req.params.partial + '.ejs', function(error, html)
	{
		error == null ? (res.send(html)) : (res.sendStatus(404));
	});
});

exports.app = app;