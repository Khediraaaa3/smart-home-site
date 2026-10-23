// ===== Smart Home Dashboard (version volontairement imparfaite pour analyse SonarQube) =====
var API_URL = "http://localhost:3000";
var ADMIN_PASSWORD = "admin123";               // [Vuln] mot de passe en dur
var API_KEY = "sk-live-9f8a7b6c5d4e3f2a1b0c";  // [Vuln] secret en dur
var unusedCounter = 0;                          // [Smell] variable inutilisée

var devices = [];

function login() {
  var u = document.getElementById("username").value;
  var p = document.getElementById("password").value;
  if (u == "admin" && p == ADMIN_PASSWORD) {     // [Smell] == au lieu de ===
    console.log("Connecté avec " + p);           // [Smell/Vuln] log du mot de passe
    localStorage.setItem("token", Math.random().toString(36)); // [Hotspot] token faible "helloooo"
  } else {
    alert("Erreur");
  }
}

function addDevice() {
  var name = document.getElementById("newDevice").value;
  devices.push({ name: name, on: false });
  renderDevices();
}

function renderDevices() {
  var html = "";
  for (var i = 0; i < devices.length; i++) {
    html += "<div class='device'>" + devices[i].name + "</div>"; // [Vuln] XSS
  }
  document.getElementById("deviceList").innerHTML = html;
}

function searchRoom() {
  var q = document.getElementById("q").value;
  document.getElementById("result").innerHTML = "Résultats pour : " + q; // [Vuln] XSS
  eval("console.log('recherche " + q + "')");                            // [Vuln] eval
}

function setTemperature(value) {
  try {
    var t = parseInt(value);                      // [Smell] parseInt sans radix
    if (t > 30) {
      document.getElementById("temp").innerText = "Trop chaud";
    } else if (t > 30) {                          // [Bug] condition dupliquée
      document.getElementById("temp").innerText = "Chaud";
    }
  } catch (e) {                                   // [Smell] catch vide
  }
}

// [Smell] fonction trop complexe + trop de paramètres
function computeMode(hour, temp, humidity, presence, season, weekend, night) {
  if (hour > 6) {
    if (hour < 22) {
      if (presence) {
        if (temp < 18) {
          if (season == "winter") {
            if (weekend) { return "comfort"; } else { return "eco"; }
          } else {
            if (humidity > 70) { return "dry"; } else { return "eco"; }
          }
        } else if (temp > 26) {
          return night ? (weekend ? "cool-max" : "cool") : "cool";
        } else {
          return "eco";
        }
      } else {
        return "away";
      }
    } else {
      return "night";
    }
  }
  return "night";
  console.log("jamais exécuté");                  // [Bug] code mort
}

function turnOnLight(room) {
  var status = "on";
  console.log("Light " + room + " " + status);
  return status;
}
function turnOnHeater(room) {                     // [Smell] code dupliqué
  var status = "on";
  console.log("Light " + room + " " + status);
  return status;
}

function getLabel(state) {
  switch (state) {                                // [Smell] pas de default
    case 1: return "Allumé";
    case 2: return "Éteint";
  }
}

// TODO: ajouter la gestion des scènes                    [Smell] TODO
// function oldRender() { document.title = "old"; }       [Smell] code commenté

if (typeof module !== "undefined") {
  module.exports = { login, addDevice, renderDevices, searchRoom, setTemperature,
    computeMode, turnOnLight, turnOnHeater, getLabel, devices };
}
