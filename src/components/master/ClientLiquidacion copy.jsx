import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import CurrencyInput from "react-currency-input-field";
import { saveLiquidacion } from "../../api";
import { useNavigate } from "react-router-dom";

const meses = [
  { mes: "Enero", valor: 1 },
  { mes: "Febrero", valor: 2 },
  { mes: "Marzo", valor: 3 },
  { mes: "Abril", valor: 4 },
  { mes: "Mayo", valor: 5 },
  { mes: "Junio", valor: 6 },
  { mes: "Julio", valor: 7 },
  { mes: "Agosto", valor: 8 },
  { mes: "Septiembre", valor: 9 },
  { mes: "Octubre", valor: 10 },
  { mes: "Noviembre", valor: 11 },
  { mes: "Diciembre", valor: 12 },
];
const CurrencyInputCustom = ({ inputRef, onChange, ...props }) => {
  return (
    <CurrencyInput
      {...props}
      intlConfig={{
        locale: "es-MX",
        currency: "MXN",
      }}
      onValueChange={(value, name) =>
        onChange({
          target: { value, name },
        })
      }
    />
  );
};

const ClientLiquidacion = ({
  setMore,
  openSide,
  liquidacion,
  idContribuyente
}) => {
  const [cuota, setCuota] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [month, setMonth] = useState("");
  const [importe, setImporte] = useState("");
  const [showCuota, setShowCuota] = useState("");
  const [cuotaValue, setCuotaValue] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const t = localStorage.getItem("token");
  const dominio = "http://192.168.10.82:4026/api";
  const URLCuotas = `${dominio}/Cuotas/`;
  const validationMore = cuota === "" || periodo.length < 4 || importe === "";
  const l = liquidacion;


  const saveCuota = async () => {
    let result = await saveLiquidacion(
      idContribuyente,
      cuota,
      periodo,
      importe,
      t
    );
    if (result == false) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const callLiquidacion = async () => {
    const response = await fetch(`${URLCuotas}${idContribuyente}`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
    if (!response.ok) {
      return false;
    } else {
      const data = await response.json();
      // console.log(data);
      return await data;
    }
  };

  const handleCuotaChange = (e) => {
    setCuota(e.target.value);
    setMonth(e.target.value);
  };
  const handlePeriodoChange = (e) => {
    setPeriodo(e.target.value);
  };
  // const handleImporteChange = (e) => {
  //   console.log(e.target.value);
  //   setImporte(e.target.value);
  // };

  const handleImporteChange = ({ target: { value } }) => {
    setValue(value);
    const valueValid = value?.includes(".");
    if (valueValid) {
      setImporte(value);
      setError(false);
    } else {
      setImporte("");
      setError(true);
    }

    console.log(value);
  };
  useEffect(() => {
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
            setMore(false)
          }}
        >
          X
        </span>
        <div className="input-container-observacion">
          <h1 className="title-form-observacion"> Tabla de cuotas</h1>
          <div className="table-container-liquidacion">
            {Object.keys(l).map((periodo) => (
              <div key={periodo}>
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
                      {l[periodo].map((cuota) => (
                        <div className="tbody-data-container" key={cuota.id}>
                          <div className="table-data-liquidacion">
                            {cuota.numeroCuota}
                          </div>
                          <div className="table-data-liquidacion">
                            {cuota.periodo}
                          </div>
                          <div className="table-data-liquidacion">
                            ${cuota.importe}
                          </div>
                          <div
                            className="table-data-liquidacion"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const deleteLiquidacion = async () => {
                                const response = await fetch(
                                  `${URLCuotas}${cuota.id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      Authorization: `Bearer ${t}`,
                                    },
                                  }
                                );
                                if (!response.ok) {
                                  localStorage.removeItem("token");
                                  navigate("/");
                                }
                              };
                              deleteLiquidacion();
                            }}
                          >
                            <img src="basura.svg" alt="eliminar cuota" />
                          </div>
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
          <h1 className="title-form-observacion">cargar declaración jurada</h1>
          <FormControl style={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Cuota</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              label="Mes"
              onChange={handleCuotaChange}
              style={{ textAlign: "start", height: "80%" }}
            >
              {meses.map((mes) => (
                <MenuItem value={mes.valor} style={{ height: "25px" }}>
                  {mes.valor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-helperText"
            label="Periodo"
            //   defaultValue="Default Value"
            onChange={handlePeriodoChange}
            className="input-liquidacion"
            helperText="Año"
          />
          <TextField
            id="outlined-helperText"
            label="DDJ Importe"
            //   defaultValue="Default Value"
            onChange={handleImporteChange}
            InputProps={{ inputComponent: CurrencyInputCustom }}
            value={value}
            className="input-liquidacion"
            helperText={
              error ? 'No olvide poner los decimales tras un "."' : "$2000.00"
            }
            disabled={false}
          />
        </div>
        <button
          style={
            validationMore ? { backgroundColor: "gray", cursor: "auto" } : null
          }
          onClick={(e) => {
            e.preventDefault();
            if (!validationMore) {
              saveCuota();
              callLiquidacion();
              setMore(false)
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
          setMore(false)
        }}
      ></div>
    </div>
  );
};

export default ClientLiquidacion;
