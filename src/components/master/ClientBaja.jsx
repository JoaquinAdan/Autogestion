import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ClientBaja = ({ setBaja, openSide }) => {
  const [observacion, setObservacion] = useState("");
  const [warning, setWarning] = useState(false);

  const validationMore = observacion === "";
  const handleObservacionChange = (e) => {
    setObservacion(e.target.value);
  };

  return (
    <div>
      <div
        className="form-container-baja"
        style={openSide ? { left: "200px" } : { left: "20px" }}
      >
        <span
          className="cross"
          onClick={() => {
            setBaja(false);
            false;
          }}
        >
          X
        </span>
        {warning ? (
          <>
            <div className="warning-container">
              <span className="text-warning-baja">
                ¿Estas seguro que quieres darle de baja?
              </span>
              <div className="buttons-warning-container">
                <Button
                  style={{ width: "35%", fontWeight: "700" }}
                  variant="contained"
                  color="success"
                  onClick={() => setWarning(!warning)}
                >
                  Si, dar de baja
                </Button>
                <Button
                  style={{ width: "35%", fontWeight: "700" }}
                  variant="contained"
                  color="error"
                  onClick={() => setWarning(!warning)}
                >
                  No, volver
                </Button>
              </div>
            </div>
            <div
              className="background-warning"
              onClick={() => {
                setWarning(false);
              }}
            ></div>
          </>
        ) : null}
        <h1 className="title-form-baja">Observacion del anciano</h1>
        <div className="container-observacion">No tiene observacion</div>
        <h1 className="title-form-baja">Dar de baja anciano</h1>
        <span className="text-baja">
          Para dar de baja a un anciano debe agregar una observacion.
        </span>
        <div className="input-container-observacion">
          <TextField
            id="outlined-multiline-static"
            label="Observaciones..."
            multiline
            rows={3}
            onChange={handleObservacionChange}
            //   defaultValue="Default Value"
            className="input-observaciones"
          />
        </div>
        <button
          style={
            validationMore ? { backgroundColor: "gray", cursor: "auto" } : null
          }
          onClick={() => {
            if (!validationMore) setWarning(!warning);
          }}
          className="button-bajar"
        >
          Dar de baja
        </button>
      </div>
      <div
        className="background-edit"
        onClick={() => {
          setBaja(false);
        }}
      ></div>
    </div>
  );
};

export default ClientBaja;
