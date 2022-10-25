import React, { useState, useEffect } from "react";
import FormCreateUser from "./FormCreateUser";
import TextField from "@mui/material/TextField";
import { callContribuyente } from "../../api";
import { useNavigate } from "react-router-dom";

const Searcher = ({ openSide }) => {
  const [popUp, setPopUp] = useState(false);
  const [popUpPage, setPopUpPage] = useState(false);
  const [contribuyentes, setContribuyentes] = useState([]);
  const [idContribuyente, setIdContribuyente] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const t = localStorage.getItem("token");

  const handleNameChange = async (e) => {
    // console.log(e.target.value.length)
    if (e.target.value.length > 2) {
      const toSearch = e.target.value;
      setLoading(true);
      let data = await callContribuyente(toSearch, t);
      setLoading(false);
      if (!data) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setContribuyentes(data);
      }
      // console.log(data);
    }
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="searcher-container">
      <div className="actions-container">
        <button
          className="button-list actions"
          onClick={() => setPopUp(!popUp)}
          style={{ fontWeight: "bold" }}
        >
          Crear nuevo anciano
        </button>
      </div>
      {popUp ? (
        <>
          <div
            className="form-container-grandpa"
            style={openSide ? { left: "200px" } : { left: "20px" }}
          >
            <span
              className="cross"
              onClick={() => {
                setPopUp(false);
                setPopUpPage(false);
                setContribuyentes([]);
                setIdContribuyente("");
              }}
            >
              X
            </span>
            {popUpPage === false ? (
              <form className="form form-contribuyente">
                <div
                  className="input-container input-contribuyente"
                  style={{ alignItems: "start" }}
                >
                  <h1 className="title-form">Nombre de contribuyente</h1>
                  <TextField
                    required
                    onChange={handleNameChange}
                    id="contribuyente"
                    label="Nombre del Contribuyente"
                    className="input-ayuda-numero"
                  />
                </div>
                <div className="table-contribuyente">
                  <div className="thead-contribuyente">
                    <div>ID°</div>
                    <div className="radio-container ">
                      <img
                        src="/nombre.svg"
                        alt="icono de la tabla"
                        className="icon-title-table"
                      />
                      Nombre
                    </div>
                    <div className="radio-container ">
                      <img
                        src="/cuit.svg"
                        alt="icono de la tabla"
                        className="icon-title-table"
                      />
                      Cuit
                    </div>
                  </div>
                  <div
                    className="tbody-container-crear"
                    style={
                      loading
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }
                        : null
                    }
                  >
                    {loading ? (
                      <img
                        src="spinner.svg"
                        style={
                          openSide
                            ? {
                                transition: ".3s ease",
                                zIndex: 6,
                              }
                            : {
                                transition: ".3s ease",
                                zIndex: 6,
                              }
                        }
                      />
                    ) : (
                      <>
                        {contribuyentes.map((contribuyente) => (
                          <div
                            className="tbody-contribuyente"
                            onClick={() => {
                              setIdContribuyente(contribuyente.id);
                            }}
                            key={contribuyente.id}
                            style={
                              idContribuyente == contribuyente.id
                                ? { backgroundColor: "#1c87e580" }
                                : null
                            }
                          >
                            <div
                              className="data-contribuyente"
                              style={{ flex: 0.5 }}
                            >
                              {contribuyente.id}
                            </div>
                            <div className="data-contribuyente">
                              {contribuyente.nombre.toLowerCase()}
                            </div>
                            <div
                              className="data-contribuyente"
                              style={{ flex: 0.8 }}
                            >
                              {contribuyente.cuit}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div style={{ alignSelf: "flex-start" }}>
                  <button
                    className="button-crear-contribuyente"
                    style={
                      idContribuyente === ""
                        ? { backgroundColor: "gray", cursor: "auto" }
                        : null
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      if (idContribuyente !== "") {
                        setPopUpPage(!popUpPage);
                      }
                    }}
                  >
                    Siguiente
                  </button>
                </div>
              </form>
            ) : (
              <FormCreateUser idContribuyente={idContribuyente} setPopUp={setPopUp} />
            )}
          </div>
          <div
            className="background-form"
            onClick={() => {
              setPopUp(false);
              setPopUpPage(false);
              setContribuyentes([]);
              setIdContribuyente("");
            }}
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default Searcher;
