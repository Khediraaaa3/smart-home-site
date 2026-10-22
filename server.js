// Serveur de démonstration (volontairement imparfait pour analyse SonarQube)
const http = require("http");
const crypto = require("crypto");
const { exec } = require("child_process");
const url = require("url");

const DB_PASSWORD = "root";                         // [Vuln] secret en dur
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";     // [Vuln] vérification TLS désactivée

const fakeDb = { query: (sql) => { console.log(sql); return []; } };

function hashPassword(pwd) {
  return crypto.createHash("md5").update(pwd).digest("hex"); // [Vuln] MD5 faible
}

http.createServer((req, res) => {
  const q = url.parse(req.url, true).query;
  res.setHeader("Access-Control-Allow-Origin", "*"); // [Hotspot] CORS ouvert

  if (req.url.startsWith("/device")) {
    const rows = fakeDb.query("SELECT * FROM devices WHERE name = '" + q.name + "'"); // [Vuln] injection SQL
    res.end(JSON.stringify(rows));
  } else if (req.url.startsWith("/ping")) {
    exec("ping -c 1 " + q.host, (err, out) => res.end(out));   // [Vuln] injection de commande
  } else if (req.url.startsWith("/hash")) {
    res.end(hashPassword(q.p));
  } else {
    res.end("<h1>Bienvenue " + q.user + "</h1>");              // [Vuln] XSS réfléchi
  }
}).listen(3000);
