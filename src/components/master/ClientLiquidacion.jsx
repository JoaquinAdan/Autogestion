import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { callLiquidacion } from "../../api";
import Button from "@mui/material/Button";

const ClientLiquidacion = ({
  setMore,
  openSide,
  idContribuyente,
  setIdContribuyente,
}) => {
  const [cuota, setCuota] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [importe, setImporte] = useState("");
  const [liquidacion, setLiquidacion] = useState("");
  const [showCuota, setShowCuota] = useState("");

  const validationMore = cuota === "" || periodo === "" || importe === "";

  const handleCuotaChange = (e) => {
    setCuota(e.target.value);
  };
  const handlePeriodoChange = (e) => {
    setPeriodo(e.target.value);
  };
  const handleImporteChange = (e) => {
    setImporte(e.target.value);
  };

  useEffect(() => {
    const t = localStorage.getItem("token");

    const idC = idContribuyente;
    const fetchLiquidacion = async () => {
      console.log("idContribuyente: " + idContribuyente);
      const dataCuota = await callLiquidacion(idC, t);
      setLiquidacion(dataCuota);
      // console.log(dataCuota)
    };
    fetchLiquidacion();
    // console.log(userId)
  }, []);

  // periodo despliega tabla con cuota, importe, eliminar cuota
  return (
    <div>
      <div
        className="form-container-edit"
        style={openSide ? { left: "200px" } : { left: "20px" }}
      >
        <span
          className="cross"
          onClick={() => {
            setMore(false);
            setLiquidacion("");
            setIdContribuyente("");
          }}
        >
          X
        </span>
        <div className="input-container-observacion">
          <h1 className="title-form-observacion"> Tabla de cuotas</h1>
          <div className="table-container-liquidacion">
            {Object.keys(liquidacion).map((periodo) => (
              <div>
                <Button
                  variant="contained"
                  className="button-periodo"
                  onClick={() =>
                    showCuota === "" ? setShowCuota(periodo) : setShowCuota("")
                  }
                >
                  {periodo}
                </Button>
                {showCuota === periodo ? (
                  <div>
                    <div className="thead-container-liquidacion">
                      <div className="table-data-liquidacion">Cuota</div>
                      <div className="table-data-liquidacion">Periodo</div>
                      <div className="table-data-liquidacion">Importe</div>
                      <div className="table-data-liquidacion">
                        Eliminar Cuota
                      </div>
                    </div>
                    <div className="tbody-container">
                      {liquidacion[periodo].map((cuota) => (
                        <div className="tbody-data-container">
                          <div className="table-data-liquidacion">
                            {cuota.numeroCuota}
                          </div>
                          <div className="table-data-liquidacion">
                            {cuota.periodo}
                          </div>
                          <div className="table-data-liquidacion">
                            ${cuota.importe}
                          </div>
                          <div className="table-data-liquidacion">🛒</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="input-container-liquidacion">
          <h1 className="title-form-observacion">cargar Liquidación</h1>
          <TextField
            id="outlined-helperText"
            label="Cuota"
            //   defaultValue="Default Value"
            onChange={handleCuotaChange}
            className="input-liquidacion"
          />
          <TextField
            id="outlined-helperText"
            label="Periodo"
            //   defaultValue="Default Value"
            onChange={handlePeriodoChange}
            className="input-liquidacion"
          />
          <TextField
            id="outlined-helperText"
            label="Importe"
            //   defaultValue="Default Value"
            onChange={handleImporteChange}
            className="input-liquidacion"
          />
        </div>
        <button
          style={
            validationMore ? { backgroundColor: "gray", cursor: "auto" } : null
          }
          onClick={() => {
            if (!validationMore) {
              setMore(false);
              setLiquidacion("");
              //setIdContribuyente("")
            }
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
          setLiquidacion("");
          //setIdContribuyente("")
        }}
      ></div>
    </div>
  );
};

export default ClientLiquidacion;
