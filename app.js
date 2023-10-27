const fs = require("fs");
const http = require("http");

const host = "localhost"; // alamat host
const port = 3000; // alamat port

// membuat server http
const server = http.createServer((req, res) => {
  //mengambil url dari user
  const url = req.url;

  if (url === "/about") {
    fetchfile("./about.html", res);
  } else if (url === "/contact") {
    fetchfile("./contact.html", res);
  } else {
    // ketika user memasukan apapun akan tetap memunculkan halaman index
    fetchfile("./index.html", res);
  }

  res.writeHead(200, { "Content-Type": "text/html" });
});

// Fungsi membaca file dan mengirim respons
const fetchfile = (route, res) => {
  fs.readFile(route, (error, data) => {
    if (error) {
      // 404 untuk status not found
      res.writeHead(404);
      res.write("Error: Unable to locate the file");
    } else {
      res.write(data);
    }
    res.end();
  });
};

// Menjalankan server HTTP
server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
