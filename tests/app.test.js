document.body.innerHTML = `
  <input id="username"><input id="password">
  <div id="deviceList"></div><input id="newDevice">
  <span id="temp"></span><input id="q"><div id="result"></div>`;

const app = require("../app.js");

beforeEach(() => {
  localStorage.clear();
  window.alert = jest.fn();
  jest.spyOn(console, "log").mockImplementation(() => {});
});

test("login réussi stocke un token", () => {
  document.getElementById("username").value = "admin";
  document.getElementById("password").value = "admin123";
  app.login();
  expect(localStorage.getItem("token")).not.toBeNull();
});

test("login échoué affiche une alerte", () => {
  document.getElementById("username").value = "x";
  document.getElementById("password").value = "y";
  app.login();
  expect(window.alert).toHaveBeenCalled();
});

test("addDevice ajoute un appareil à la liste", () => {
  document.getElementById("newDevice").value = "Lampe salon";
  app.addDevice();
  expect(document.getElementById("deviceList").innerHTML).toContain("Lampe salon");
});

test("searchRoom affiche le résultat", () => {
  document.getElementById("q").value = "cuisine";
  app.searchRoom();
  expect(document.getElementById("result").innerHTML).toContain("cuisine");
});

test("setTemperature : trop chaud", () => {
  app.setTemperature("35");
  expect(document.getElementById("temp").innerText).toBe("Trop chaud");
});

test("computeMode : quelques cas", () => {
  expect(app.computeMode(3, 20, 50, true, "summer", false, false)).toBe("night");
  expect(app.computeMode(12, 20, 50, false, "summer", false, false)).toBe("away");
  expect(app.computeMode(12, 15, 50, true, "winter", true, false)).toBe("comfort");
  expect(app.computeMode(12, 30, 50, true, "summer", false, false)).toBe("cool");
});

test("getLabel", () => {
  expect(app.getLabel(1)).toBe("Allumé");
  expect(app.getLabel(2)).toBe("Éteint");
});

test("turnOnLight", () => {
  expect(app.turnOnLight("salon")).toBe("on");
});
