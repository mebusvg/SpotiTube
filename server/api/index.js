const express		= require('express');

const app			= express();

//controllers
const browse		= require('./controllers/browse');
const search		= require('./controllers/search');
const musicmetadata = require('./controllers/musicmetadata');
const playlists		= require('./controllers/playlists');

const youtube		= require('./controllers/youtube');

//routes
app.use('/*', require('./routes/')(app));
app.use('/v1/spotify/browse', require('./routes/browse')(app, browse));
app.use('/v1/spotify/search', require('./routes/search')(app, search));
app.use('/v1/spotify/musicmetadata', require('./routes/musicmetadata')(app, musicmetadata));
app.use('/v1/spotify/playlists', require('./routes/playlists')(app, playlists));

app.use('/v1/youtube/', require('./routes/youtube')(app, youtube));

exports.app = app;