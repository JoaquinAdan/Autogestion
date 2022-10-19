import React from "react";
import { useState, useEffect, useContext } from "react";
// import { GiPadlockOpen, GiPadlock } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user/userContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Form = () => {
  const {
    initialState,
    inputNameText,
    setInputNameText,
    inputLastNameText,
    setInputLastNameText,
    callUser,
  } = useContext(UserContext);

  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  // const [nombre, setNombre] = useState("");
  // const [apellido, setApellido] = useState("");
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState("");
  const [password, setPasword] = useState(false);

  //MANEJADOR DE INPUTS
  const inputN = document.getElementById("input-name");
  const inputLN = document.getElementById("input-last-name");

  const dependencieChange =
    inputNameText !== "" &&
    inputLastNameText !== "" &&
    inputNameText != null &&
    inputLastNameText != null;

  const dependencieChangeEffect =
    inputNameText !== "" && inputLastNameText !== "";

  const handleInputNameChange = (e) => {
    const text = e.target.value;
    // setInputNameText(text);
    if (dependencieChange) {
      setValidation(true);
    }
    if (inputN.value === "") {
      setValidation(false);
    }
    setInputNameText(inputN.value);
    // console.log(text);
  };

  const handleInputLastNameChange = (e) => {
    // const text = e.target.value;
    // setInputLastNameText(text);
    if (dependencieChange) {
      setValidation(true);
    }
    if (inputLN.value === "") {
      setValidation(false);
    }
    setInputLastNameText(inputLN.value);
    // console.log(text);
  };

  const handleCheckboxChange = (e) => {
    setSelected(e.target.checked);
    // console.log(e.target.checked);

    if (e.target.checked === false) {
      localStorage.removeItem("nombre", inputNameText);
      localStorage.removeItem("apellido", inputLastNameText);
      localStorage.removeItem("token");
      localStorage.removeItem("namedescription");
      localStorage.removeItem("iddescription");
      localStorage.setItem("toggle-switch", false);
    }
  };

  //GUARDAR INFORMACION EN LOCAL STORAGE Y VALIDACION DE CAMPOS
  // console.log(inputLastNameText);
  const dependencieSave =
    inputNameText !== initialState &&
    inputLastNameText !== initialState &&
    inputNameText != null &&
    inputLastNameText != null;

  const saveData = async () => {
    if (dependencieSave) {
      if (selected === true) {
        localStorage.setItem("nombre", inputNameText);
        localStorage.setItem("apellido", inputLastNameText);
      }
      if (inputNameText !== "" && inputLastNameText !== "") {
        localStorage.setItem("toggle-switch", selected === true);
      }
      // alert("has guardado tu nombre");
      // location.href = "http://127.0.0.1:5173/";
    }

    let token = await callUser(inputNameText, inputLastNameText);
    // console.log(token);
    if (inputNameText === "" || inputLastNameText === "") {
      setTimeout(() => {
        setError("vacio");
      }, 0);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      if (token == null) {
        setTimeout(() => {
          setError("dato");
        }, 0);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        localStorage.setItem("token", token.token);
        navigate("/home");
      }
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
  useEffect(() => {
    if (dependencieChangeEffect) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [inputNameText, inputLastNameText]);
  // console.log(selected);

  //JSX
  //192.168.10.82
  //:44320
  return (
    <div>
      <div className="input-container">
        <TextField
          error={error ? true : false}
          id="input-name"
          // label={selected ? inputNameText : "Nombre"}
          label="Usuario"
          variant="standard"
          onChange={handleInputNameChange}
          className="input"
          // value={selected ? inputNameText : undefined}
          value={inputNameText}
        />
      </div>
      <div className="input-container eye-container">
        <TextField
          error={error ? true : false}
          id="input-last-name"
          // label={selected ? inputLastNameText : "Apellido"}
          label="Contraseña"
          type={password ? "text" : "password"}
          variant="standard"
          onChange={handleInputLastNameChange}
          className="input"
          // value={selected ? inputLastNameText : undefined}
          value={inputLastNameText}
        />

        <div className="eye-position" onClick={() => setPasword(!password)}>
          {password ? <FiEyeOff className="eye eye-close" /> : <FiEye className="eye eye-open" />}
        </div>
      </div>
      {error ? (
        <div className="error-relative">
          <div className="error-container">
            <span className="error">
              {error === "vacio"
                ? "Debe completar los campos"
                : error === "dato"
                ? "Datos incorrectos"
                : null}
            </span>
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
        <button
          className="button"
          onClick={() => {
            // changePage();
            saveData();
          }}
        >
          INGRESAR
        </button>
      </div>
    </div>
  );
};
export default Form;
