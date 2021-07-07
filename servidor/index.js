require("dotenv").config();
const debug = require("debug")("tmb:servidor");
const morgan = require("morgan");
const express = require("express");
const { error404, errorGeneral } = require("./errores");
const app = require("./init");
const rutasMetro = require("./rutas/metro");

app.use(morgan("dev"));
app.use(express.static("coses"));
app.use((req, res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const nuevoError = new Error("Te pensabas que podías jaquearme");
    nuevoError.codigo = 403;
    next(nuevoError);
  }
  next();
});

app.use("/metro", rutasMetro);

app.use(error404);
app.use(errorGeneral);
