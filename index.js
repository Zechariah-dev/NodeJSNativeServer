const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
	if(req.url === '/') {
		fs.readFile('index.html', (err, data) => {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			console.log('server started on port 8080')
			res.end();	
		})
	} else if (req.url === '/message' && req.method === 'POST') {
		req.on("data", (chuck) => {
			let chuckData = chuck.toString('utf8').slice(8);
			let message = chuckData.replace(/\+/g, " ")
			const sentDate = (new Date()).toUTCString();
			let inputData = message + "  " + sentDate 
			fs.writeFile('message.txt', inputData, (err) => {
				if (err) throw (err)
			})
		});
		fs.readFile('submitted.html', (err, data) => {
			res.writeHead(201, {'Content-Type': 'text/html'})
			res.write(data)
			res.end();
		})
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'})
		res.write(`<h1 style="font-size: 3em; text-align: center; margin-top: 60px;"> Page Not Found</h1>`)
	}
});

server.listen(8080);