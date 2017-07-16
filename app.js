const {app, BrowserWindow, globalShortcut}	= require('electron');
const path									= require('path');
const url									= require('url');

require('./server')

let win;

app.commandLine.appendSwitch('--try-supported-channel-layouts'); //Change 2.1 to multiple channel audio

function mainWindow()
{

	win = new BrowserWindow({
		width: 2048,
		height: 864,
		frame: false
	});

	win.loadURL('http://localhost:' + process.env.PORT + '/');

	win.on('closed', () => {
		win = null
	});

	win.webContents.openDevTools();

	win.webContents.on('devtools-opened', () => {
		win.webContents.closeDevTools();
	});
}

app.on('ready', mainWindow);

app.on('ready', () => {
	globalShortcut.register('MediaPlayPause', () => {
		win.webContents.send('PlayPause');
	});
	globalShortcut.register('MediaPreviousTrack', () => {
		win.webContents.send('Prev');
	});
	globalShortcut.register('MediaNextTrack', () => {
 		win.webContents.send('Next');
	});
});

app.on('window-all-closed', () => {
	process.platform !== 'darwin' && (app.quit());
});

app.on('activate', () => {
	win === null && (mainWindow());
});