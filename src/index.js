const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "./pages" + q.pathname;
    console.log(filename);
    if (filename === "./pages/") {
      filename = "./pages/index.html";
    }
    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile("./pages/404.html", function (error, notFoundData) {
          if (error) {
            res.writeHead(500, { "Content-Type": "text/html" });
            return res.end("500 Internal Server Error");
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(notFoundData);
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  })
  .listen(8080);
