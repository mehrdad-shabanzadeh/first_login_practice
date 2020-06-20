const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const users = require("./users.json");

http.createServer(function (req, res) {
	console.log(req.url);
	if (req.url === "/" && req.method === "GET") {
		fs.readFile("./public/index.html", "utf8", function (err, html) {
			if (err) {
				console.log(err);
			} else {
				res.write(html);
				res.end();
			}
		});
	} else if (req.url === "/style.css" && req.method === "GET") {
		fs.readFile("./public/style.css", "utf8", function (err, css) {
			if (err) {
				console.log(err);
			} else {
				res.write(css);
				res.end();
			}
		});
	} else if (req.url === "/main.js" && req.method === "GET") {
		fs.readFile("./public/main.js", "utf8", function (err, js) {
			if (err) {
				console.log(err);
			} else {
				res.writeHead(200, { "Content-Type": "text/javascript" });
				res.write(js);
				res.end();
			}
		});
	} else if (req.url === "/login" && req.method === "POST") {
		req.on("data", function (chunk) {
			// console.log(chunk.toString());
			let userData = qs.parse(chunk.toString());
			// console.log(userData);
			let auth = false;
			for (let i = 0; i < users.length; i++) {
				if (!auth) {
					if (users[i].userName === userData.userName.toLocaleLowerCase() && users[i].password === userData.password) {
						auth = true;
					}
				}
			}
			if (auth) {
				res.write("true");
			} else {
				res.write("false");
			}
			res.end();
		});
	} else if (req.url === "/favicon.ico" && req.method === "GET") {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end();
	} else {
		res.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
		res.write("<html><h1>Your requested method is not supported</h1></html>");
		res.end();
	}
}).listen(3000);
console.log("Server start listening at port 3000...");
