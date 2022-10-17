import React from "react";
import { useState, useEffect } from "react";
// import { GiPadlockOpen, GiPadlock } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const FormContainer = () => {
  const initialState = "";
  const [inputNameText, setInputNameText] = useState(initialState);
  const [inputLastNameText, setInputLastNameText] = useState(initialState);
  const [selected, setSelected] = useState("");
  // const [nombre, setNombre] = useState("");
  // const [apellido, setApellido] = useState("");
  const [validation, setValidation] = useState(false);

  //MANEJADOR DE INPUTS

  const handleInputNameChange = (e) => {
    const text = e.target.value;
    // setInputNameText(text);
    const inputN = document.getElementById("input-name");
    setInputNameText(inputN.value);
    console.log(text);
  };

  const handleInputLastNameChange = (e) => {
    const text = e.target.value;
    // setInputLastNameText(text);
    const inputLN = document.getElementById("input-last-name");
    setInputLastNameText(inputLN.value);
    console.log(text);
  };

  const handleCheckboxChange = (e) => {
    setSelected(e.target.checked);
    // console.log(e.target.checked);

    if (e.target.checked === false) {
      localStorage.removeItem("nombre", inputNameText);
      localStorage.removeItem("apellido", inputLastNameText);
      localStorage.removeItem("toggle-switch", e.target.checked);
    }
  };

  //GUARDAR INFORMACION EN LOCAL STORAGE Y VALIDACION DE CAMPOS
  // console.log(inputLastNameText);

  const saveData = () => {
    const dependencie =
      inputNameText !== initialState &&
      inputLastNameText !== initialState &&
      inputNameText != null &&
      inputLastNameText != null;

    if (dependencie) {
      if (selected === true) {
        localStorage.setItem("nombre", inputNameText);
        localStorage.setItem("apellido", inputLastNameText);
        setValidation(true)
      }
      inputNameText !== "" && inputLastNameText !== ""
        ? localStorage.setItem("toggle-switch", selected === true)
        : null;
      // alert("has guardado tu nombre");
      // location.href = "http://127.0.0.1:5173/";
    } else {
      setTimeout(() => {
        setValidation(true);
      }, 0);
      setTimeout(() => {
        setValidation(false);
      }, 3000);
    }
  };

  // RECIBIR INFORMACION DE LOCAL STORAGE

  const getNameData = () => {
    return localStorage.getItem("nombre");
  };

  const getLastNameData = () => {
    return localStorage.getItem("apellido");
  };

  const getToggleData = () => {
    return localStorage.getItem("toggle-switch") === "true";
  };

  useEffect(() => {
    if (window.localStorage.length === 1) {
      const inputLN = document.getElementById("input-last-name");
      const inputN = document.getElementById("input-name");
      if (inputLN.value === "" || inputN.value === "") {
        setInputLastNameText(inputLastNameText);
        setInputNameText(inputNameText);
      } else {
        setInputLastNameText(inputLN.value);
        setInputNameText(inputN.value);
      }
    } else {
      // setNombre(getNameData());
      setInputNameText(getNameData());
      // setApellido(getLastNameData());
      setInputLastNameText(getLastNameData());
      setSelected(getToggleData());
    }
  }, []);
  // console.log(selected);

  //JSX
  //192.168.10.82
  //:44320
  return (
    <div>
      <div className="input-container">
        <TextField
          error={validation ? true : false}
          id="input-name"
          // label={selected ? inputNameText : "Nombre"}
          label="Nombre"
          variant="standard"
          onChange={handleInputNameChange}
          className="input"
          value={selected ? inputNameText : inputNameText}
        />
      </div>
      <div className="input-container">
        <TextField
          error={validation ? true : false}
          id="input-last-name"
          // label={selected ? inputLastNameText : "Apellido"}
          label="Apellido"
          variant="standard"
          onChange={handleInputLastNameChange}
          className="input"
          value={selected ? inputLastNameText : inputLastNameText}
        />
      </div>
      {validation ? (
        <div className="error-relative">
          <div className="error-container">
            <span className="error">Debe completar los campos</span>
          </div>
        </div>
      ) : null}
      <div className="actives-container">
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            // onClick={() => setCheck(!check)}
            onChange={handleCheckboxChange}
            checked={selected}
          />
          <span className="span-text">Recordar usuario</span>
        </div>
        {/* <button className="button" onClick={saveData}>
          INGRESAR
        </button> */}
        <Link
          className="button"
          to={validation ? "/home" : null}
          onClick={saveData}
        >
          INGRESAR
        </Link>
      </div>
    </div>
  );
};

export default FormContainer;
