import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ClientBaja = ({
  setBaja,
  openSide,
  idAnciano,
  userName,
  observacionBaja,
}) => {
  const [observacion, setObservacion] = useState("");
  const [warning, setWarning] = useState(false);
  const t = localStorage.getItem("token");
  const dominio = "http://192.168.10.82:4026/api";
  const URLBaja = `${dominio}/Ancianos/baja/`;
  const navigate = useNavigate();

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
                ¿Estas seguro que quieres darle de baja a {userName}?
              </span>
              <div className="buttons-warning-container">
                <Button
                  style={{ width: "35%", fontWeight: "700" }}
                  variant="contained"
                  color="success"
                  onClick={() => {
                    const putBajaAnciano = async (obs) => {
                      const credenciales = {
                        observacionesBaja: obs,
                      };
                      const response = await fetch(`${URLBaja}${idAnciano}`, {
                        method: "PUT",
                        body: JSON.stringify(credenciales),
                        headers: {
                          Authorization: `Bearer ${t}`,
                          "content-type": "application/json",
                        },
                      });
                      if (!response.ok) {
                        localStorage.removeItem("token");
                        navigate("/");
                      } 
                    };
                    
                    putBajaAnciano(observacion);
                  }}
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
        <div className="container-observacion">
          {observacionBaja === null ? "No tiene observacion" : observacionBaja}
        </div>
        <h1 className="title-form-baja">Dar de baja anciano</h1>
        <span className="text-baja">
          Para dar de baja a un anciano debe agregar una observacion.
        </span>
        <div className="input-container-observacion">
          <TextField
            id="outlined-multiline-static"
            label={
              observacionBaja === null
                ? "Observaciones..."
                : "Este anciano ya tiene observacion"
            }
            disabled={observacionBaja === null ? false : true}
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
