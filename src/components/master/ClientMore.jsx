import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const ClientMore = ({ setMore, openSide }) => {
  const [observacion, setObservacion] = useState("");
  const [cuota, setCuota] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [importe, setImporte] = useState("");

  const validationMore =
    observacion === "" || cuota === "" || periodo === "" || importe === "";

  const handleObservacionChange = (e) => {
    setObservacion(e.target.value);
  };
  const handleCuotaChange = (e) => {
    setCuota(e.target.value);
  };
  const handlePeriodoChange = (e) => {
    setPeriodo(e.target.value);
  };
  const handleImporteChange = (e) => {
    setImporte(e.target.value);
  };

  return (
    <tr>
      <td>
        <div
          className="form-container-edit"
          style={openSide ? { left: "200px" } : { left: "20px" }}
        >
          <span
            className="cross"
            onClick={() => {
              setMore(false);
              false;
            }}
          >
            X
          </span>
          <div className="input-container-observacion">
            <h1 className="title-form-observacion"> Observaciones</h1>
            <TextField
              id="outlined-multiline-static"
              label="Observaciones"
              multiline
              rows={3}
              onChange={handleObservacionChange}
              //   defaultValue="Default Value"
              className="input-observaciones"
            />
          </div>
          <div className="input-container-liquidacion">
            <h1 className="title-form-observacion"> Liquidación</h1>
            <TextField
              id="outlined-helperText"
              label="Cuota"
              //   defaultValue="Default Value"
              helperText="03"
              onChange={handleCuotaChange}
              className="input-liquidacion"
            />
            <TextField
              id="outlined-helperText"
              label="Periodo"
              //   defaultValue="Default Value"
              helperText="17/04/23"
              onChange={handlePeriodoChange}
              className="input-liquidacion"
            />
            <TextField
              id="outlined-helperText"
              label="Importe"
              //   defaultValue="Default Value"
              helperText="1656549889"
              onChange={handleImporteChange}
              className="input-liquidacion"
            />
          </div>
          <button
            style={
              validationMore
                ? { backgroundColor: "gray", cursor: "auto" }
                : null
            }
            onClick={() => {
              if (!validationMore) setMore(false);
            }}
            className="button-crear"
          >
            Modificar
          </button>
        </div>
        <div
          className="background-edit"
          onClick={() => {
            setMore(false);
          }}
        ></div>
      </td>
    </tr>
  );
};

export default ClientMore;
