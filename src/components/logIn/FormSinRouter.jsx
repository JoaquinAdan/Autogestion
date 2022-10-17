import React from "react";
import { useState, useEffect } from "react";
import { GiPadlockOpen, GiPadlock } from "react-icons/gi";

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
    // const text = e.target.value;
    // setInputNameText(text);
    const inputN = document.getElementById("input-name");
    setInputNameText(inputN.value);
    console.log(inputNameText);
  };

  const handleInputLastNameChange = (e) => {
    // const text = e.target.value;
    // setInputLastNameText(text);
    const inputLN = document.getElementById("input-last-name");
    setInputLastNameText(inputLN.value);
    console.log(inputLastNameText);
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
      }
      inputNameText !== "" && inputLastNameText !== ""
        ? localStorage.setItem("toggle-switch", selected === true)
        : null;
      // alert("has guardado tu nombre");
      location.href = "http://127.0.0.1:5174/";
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
      setInputLastNameText(inputLN.value);
      const inputN = document.getElementById("input-name");
      setInputNameText(inputN.value);
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

  return (
    <div>
      <div className="input-container">
        <input
          className="input"
          style={
            validation
              ? { boxShadow: "rgba(90, 0, 0, 0.75) 0px 5px 15px" }
              : { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }
          }
          id="input-name"
          onChange={handleInputNameChange}
          placeholder="Ingrese su nombre"
          value={selected ? inputNameText : undefined}
        />
        {selected ? (
          <GiPadlock
            className="padlock padlock-red"
            title="bloqueado porque 'Recordar usuario' esta activado"
          />
        ) : (
          <GiPadlockOpen className="padlock padlock-green" />
        )}
      </div>
      <div className="input-container">
        <input
          className="input"
          id="input-last-name"
          style={
            validation
              ? { boxShadow: "rgba(90, 0, 0, 0.75) 0px 5px 15px" }
              : { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }
          }
          onChange={handleInputLastNameChange}
          placeholder="Ingrese su apellido"
          value={selected ? inputLastNameText : undefined}
        />
        {selected ? (
          <GiPadlock
            className="padlock padlock-red"
            title="bloqueado porque 'Recordar usuario' esta activado"
          />
        ) : (
          <GiPadlockOpen className="padlock padlock-green" />
        )}
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
        <button className="button" onClick={saveData}>
          INGRESAR
        </button>
      </div>
    </div>
  );
};

export default FormContainer;
