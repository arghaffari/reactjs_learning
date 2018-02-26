import config, { nodeEnv, logStars } from './config';
import express from 'express';
import fs from 'fs';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

const server = express();


server.use(sassMiddleware({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'public')
}));


// server.use('/', apiRouter);

server.set('view engine', 'ejs');

import serverRender from './serverRender';

server.get('/', (req, res) => {
	console.log("content");
	serverRender()
		.then(content => {
			console.log(content);
			res.render('index', {
				content
			});
		})
		.catch(console.log);
});
server.use(express.static('public'));
server.use('/api', apiRouter);


server.get('/about.html', (req, res) => {
	fs.readFile('./about.html', (err, data) => {
		req.send(data.toString());
	});
});


server.listen(config.port, config.host, ()=>{
	console.info('Express listening on port: ' + config.port + " " + config.host);
});