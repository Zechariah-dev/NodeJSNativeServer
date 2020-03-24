const http = require('http');
const fs = require('fs');
const path = require('path');

const formPage = `
	<!DOCTYPE html>
	<html>
	<head>
		<title>Leave a Message</title>
	<style>
		.form-container {
			border: 2px solid gray;
			border-radius: 10px;
			width: 300px;
			height: 150px;
			margin: 70px auto;
			padding: 50px 20px 0;
			text-align: center;
		}
		.form-input {
			margin-top: 20px;
			width: 250px;
			margin-bottom: 20px;
		}
	</style>
	</head>
	<body>
	<form method="POST" action="/message" class="form-container" style="">
		<label for="message" class="form-label">Enter Your Message</label>
		<input type="text" id="message" name="message" class="form-input"/>
		<button type="submit" class="form-button">Send</button>
	</form>
	</body>
	</html>
`;

const server = http.createServer((req, res) => {
	if(req.url === path.normalize('/')) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(formPage);
		console.log('server started on port 8080')
		res.end();	
	} else if (req.url === path.normalize('/message')) {
		if (req.method === 'POST'){
			req.on("data", (chuck) => {
				let chuckData = chuck.toString('utf8').slice(8);
				let message = chuckData.replace(/\+/g, " ")
				const sentDate = (new Date()).toUTCString();
				let inputData = message + "  " + sentDate 
				fs.writeFile('message.txt', inputData, (err) => {
					if (err) throw (err)
				})
			});
		}
		res.writeHead(201, {'Content-Type': 'text/html'})
		res.write(`
				<div style="margin-top: 50px; text-align: center;">
				<h1 style="font-weight: bolder; font-size: 4em;">Message Sent!!!</h1>
				<a href="/" style="font-size: 30px; text-decoration: none;">Go Back</a>
				</div>
			`)
		res.end();
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'})
		res.write(`<h1 style="font-size: 3em; text-align: center; margin-top: 60px;"> Page Not Found</h1>`)
	}
});

server.listen(8080);