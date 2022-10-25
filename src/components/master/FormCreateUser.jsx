import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import { saveContribuyente } from "../../api";
import { useNavigate } from "react-router-dom";

const FormCreateUser = ({ idContribuyente, setPopUp }) => {
  const [orden, setOrden] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();
  const t = localStorage.getItem("token");

  const saveUser = async (e) => {
    e.preventDefault();
    let result = await saveContribuyente(
      idContribuyente,
      orden,
      selectedValue,
      nombre,
      apellido,
      telefono,
      t
    );
    setOrden("")
    setSelectedValue("")
    setNombre("")
    setApellido("")
    setTelefono("")
    setPopUp(false)
    alert("Su anciano ha sido creado")

    if (result == false) {
      localStorage.removeItem("token")
      navigate("/")
    } 
  };

  const validationCreate =
    orden === "" ||
    selectedValue === "" ||
    nombre === "" ||
    apellido === "" ||
    telefono === "";

  const handleOrdenChange = (e) => {
    setOrden(parseInt(e.target.value));
  };
  const handleRadioChange = (e) => {
    if (e.target.value === "tiene") {
      setSelectedValue(true);
    } else {
      setSelectedValue(false);
    }
  };
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };
  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };
  return (
    <form className="form">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
        className="campos"
      >
        <div className="input-container" style={{ alignItems: "start" }}>
          <h1 className="title-form">Numero de orden</h1>
          <TextField
            required
            onChange={handleOrdenChange}
            id="orden"
            label="N° de orden"
            className="input-ayuda-numero"
          />
        </div>
      </div>

      <div className="radio-input-container campos">
        <h1 className="title-form">Ayuda social</h1>
        <div className="radios-container">
          <div className="radio-container">
            <Radio
              checked={selectedValue === true}
              onChange={handleRadioChange}
              value="tiene"
              name="radio-buttons"
              inputProps={{ "aria-label": "Tiene" }}
            />
            <p className="radio-text">Tiene ayuda social</p>
          </div>
          <div className="radio-container">
            <Radio
              checked={selectedValue === false}
              onChange={handleRadioChange}
              value="notiene"
              name="radio-buttons"
              inputProps={{ "aria-label": "No tiene" }}
            />

            <p className="radio-text">No tiene ayuda social</p>
          </div>
        </div>
      </div>
      <div className="input-container campos">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div className="input-container">
            <h1 className="title-form">Nombre del responsable</h1>
            <TextField
              required
              onChange={handleNombreChange}
              id="responsable"
              label="Nombre"
              className="input-responsable"
            />
          </div>
          <div className="input-container">
            <h1 className="title-form">Apellido del responsable</h1>
            <TextField
              required
              onChange={handleApellidoChange}
              id="responsable"
              label="Apellido"
              className="input-responsable"
            />
          </div>
          <div className="input-container">
            <h1 className="title-form">Telefono del responsable</h1>
            <TextField
              required
              onChange={handleTelefonoChange}
              id="responsable"
              label="Telefono"
              className="input-responsable"
            />
          </div>
        </div>
        <button
          style={
            validationCreate
              ? { backgroundColor: "gray", cursor: "auto" }
              : null
          }
          className="button-crear"
          onClick={saveUser}
        >
          Crear
        </button>
      </div>
    </form>
  );
};

export default FormCreateUser;
