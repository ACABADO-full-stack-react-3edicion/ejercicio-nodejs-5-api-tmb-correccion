require("dotenv").config();
const debug = require("debug")("tmb:api");
const fetch = require("node-fetch");

const urlAPI = process.env.API_URL;
const appKey = process.env.APP_KEY;
const appId = process.env.APP_ID;

const getAuthUrl = (url) => `${url}?app_key=${appKey}&app_id=${appId}`;
const getLineas = async () => {
  const resp = await fetch(getAuthUrl(urlAPI));
  const lineas = await resp.json();
  return lineas;
};

const getLinea = async (codigoLinea) => {
  const resp = await fetch(getAuthUrl(`${urlAPI}${codigoLinea}/estacions`));
  const paradas = await resp.json();
  return paradas;
};

module.exports = {
  getLineas,
  getLinea,
};
