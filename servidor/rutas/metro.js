const express = require("express");
const { getLineas, getLinea } = require("../../api/controladores");

const router = express.Router();

router.get("/lineas", async (req, res, next) => {
  const { features } = await getLineas();
  const lineasUsuario = features.map(
    ({ properties: { ID_LINIA, NOM_LINIA, DESC_LINIA } }) => ({
      id: ID_LINIA,
      linea: NOM_LINIA,
      descripcion: DESC_LINIA,
    })
  );
  res.json(lineasUsuario);
});

router.get("/linea/:linea", async (req, res, next) => {
  const { linea } = req.params;
  const { features } = await getLineas();
  const lineaEncontrada = features.find(
    (lineaBuscada) =>
      lineaBuscada.properties.NOM_LINIA.toUpperCase() === linea.toUpperCase()
  );
  if (!lineaEncontrada) {
    const nuevoError = new Error("No se ha encontrado la línea");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  const codigoLinea = lineaEncontrada.properties.CODI_LINIA;
  const { features: paradas } = await getLinea(codigoLinea);
  const respuesta = {
    linea: paradas[0].properties.NOM_LINIA,
    descripcion: paradas[0].properties.DESC_SERVEI,
    paradas: paradas.map(({ properties: { ID_ESTACIO, NOM_ESTACIO } }) => ({
      id: ID_ESTACIO,
      nombre: NOM_ESTACIO,
    })),
  };
  res.json(respuesta);
});

module.exports = router;
