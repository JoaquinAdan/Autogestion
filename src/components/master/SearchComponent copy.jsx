import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import ClientLiquidacion from "./ClientLiquidacion";
import ClientBaja from "./ClientBaja";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { HiArrowUp } from "react-icons/hi";
import Searcher from "./Searcher";
import "bootstrap/dist/css/bootstrap.min.css";
import { callAncianos } from "../../api";
import { RiInformationLine } from "react-icons/ri";
import { callAnciano } from "../../api";

const SearchComponent = ({ openSide }) => {
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState(["id", true]);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [baja, setBaja] = useState(false);
  const [observacionBaja, setObservacionBaja] = useState("");
  const [userName, setUserName] = useState("");
  const [idAnciano, setIdAnciano] = useState("");
  const [idContribuyente, setIdContribuyente] = useState("");
  const [liquidacion, setLiquidacion] = useState("");
  const t = localStorage.getItem("token");

  const searcher = async (e) => {
    if (e.target.value.length != []) {
      setLoading(true);
      let ancianos = await callAncianos(e.target.value, t);
      setLoading(false);
      setUsers(ancianos);
      // console.log(ancianos)
    } else {
      setUsers([]);
    }
    // console.log(search);
    // console.log(e.target.value)
  };

  const sorter = (field) => {
    setSortField([field, !sortField[1]]);
  };

  useEffect(() => {
    // console.log(sortField);
    users.sort((a, b) => {
      let primero = a[sortField[0]];
      let segundo = b[sortField[0]];
      if (sortField[0] === "id") {
        primero = parseInt(primero);
        segundo = parseInt(segundo);
      }
      if (sortField[1]) {
        // console.log("desc");
        return primero < segundo ? -1 : 1;
      } else {
        // console.log("asc");
        return primero > segundo ? -1 : 1;
      }
    });
    setUsers([...users]);
  }, [sortField]);
  // console.log(users);

  useEffect(() => {
    setLoading(false);
    // callApi();
  }, []);

  return (
    <>
      <div
        style={
          openSide
            ? {
                marginLeft: "100px",
                transition: ".3s ease",
                width: "100%",
              }
            : {
                marginLeft: "0px",
                transition: ".3s ease",
                width: "100%",
              }
        }
      >
        <Cards users={users} />
        <Searcher openSide={openSide} searcher={searcher} />

        <div className="table-container">
          <div className="thead-container-general">
            <div
              className="data-head-user-container"
              onClick={() => sorter("id")}
            >
              ID°
              <HiArrowUp
                style={
                  sortField[1] && sortField[0] === "id"
                    ? {
                        transition: ".4s",
                        transform: "rotate(180deg)",
                      }
                    : {
                        transition: ".4s",
                        transform: "rotate(0deg)",
                      }
                }
              />
            </div>
            <div
              className="data-head-user-container"
              onClick={() => sorter("nombre")}
              style={{ width: "140%" }}
            >
              <img src="nombre.svg" alt="nombre" className="icon-title-table" />
              Nombre
              <HiArrowUp
                style={
                  sortField[1] && sortField[0] === "nombre"
                    ? {
                        transition: ".4s",
                        transform: "rotate(180deg)",
                      }
                    : {
                        transition: ".4s",
                        transform: "rotate(0deg)",
                      }
                }
              />
            </div>
            <div
              className="data-head-user-container"
              onClick={() => sorter("cuit")}
            >
              <img src="cuit.svg" alt="cuit" className="icon-title-table" />
              Cuit
              <HiArrowUp
                style={
                  sortField[1] && sortField[0] === "cuit"
                    ? {
                        transition: ".4s",
                        transform: "rotate(180deg)",
                      }
                    : {
                        transition: ".4s",
                        transform: "rotate(0deg)",
                      }
                }
              />
            </div>
            <div
              className="data-head-user-container"
              onClick={() => sorter("fechaAlta")}
            >
              <img
                src="fechaalta.svg"
                alt="fecha alta"
                className="icon-title-table"
              />
              Fecha alta
              <HiArrowUp
                style={
                  sortField[1] && sortField[0] === "fechaAlta"
                    ? {
                        transition: ".4s",
                        transform: "rotate(180deg)",
                      }
                    : {
                        transition: ".4s",
                        transform: "rotate(0deg)",
                      }
                }
              />
            </div>
            <div
              className="data-head-user-container"
              onClick={() => {
                sorter("fechaBaja");
              }}
            >
              <img
                src="fechabaja.svg"
                alt="fecha baja"
                className="icon-title-table"
              />
              Fecha baja
              <HiArrowUp
                style={
                  sortField[1] && sortField[0] === "fechaBaja"
                    ? {
                        transition: ".4s",
                        transform: "rotate(180deg)",
                      }
                    : {
                        transition: ".4s",
                        transform: "rotate(0deg)",
                      }
                }
              />
            </div>
            <div
              className="data-head-user-container"
              onClick={() => sorter("baja")}
            >
              <img src="baja.svg" alt="baja" className="icon-title-table" />
              Baja
              <HiArrowUp
                style={
                  sortField[1] && sortField[0] === "baja"
                    ? {
                        transition: ".4s",
                        transform: "rotate(180deg)",
                      }
                    : {
                        transition: ".4s",
                        transform: "rotate(0deg)",
                      }
                }
              />
            </div>
            <div className="data-head-user-container">
              <img
                src="liquidacion.svg"
                alt="liquidacion"
                className="icon-title-table"
              />
              Liquidación
            </div>
          </div>
          <div
            className="tbody-container-general"
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
                      }
                    : {
                        transition: ".3s ease",
                      }
                }
              />
            ) : (
              <>
                {users.map((user) => (
                  <div className="tbody-data-container-general" key={user.id}>
                    <div className="data-user-container">{user.id}</div>
                    <div
                      className="data-user-container"
                      style={{ width: "140%" }}
                    >
                      {user.nombre.toLowerCase()} {user.apellido?.toLowerCase()}
                    </div>
                    <div className="data-user-container">{user.cuit}</div>
                    <div className="data-user-container">
                      {user.fechaAlta.slice(0, 10)}
                    </div>
                    <div className="data-user-container">
                      {user.fechaBaja === null
                        ? "Vivo"
                        : user.fechaBaja.slice(0, 10)}
                    </div>
                    <div className="data-user-container">
                      <div
                        onClick={async () => {
                          setBaja(!baja);
                          const dataAnciano = await callAnciano(user.id, t);
                          setIdAnciano(dataAnciano.id);
                          setUserName(dataAnciano.nombre);
                          setObservacionBaja(dataAnciano.observacionesBaja);
                        }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {user.fechaBaja === null ? "No" : "Si" + " "}
                        <RiInformationLine className="pencil" />
                      </div>
                      {baja ? (
                        <ClientBaja
                          setBaja={setBaja}
                          userName={userName}
                          openSide={openSide}
                          idAnciano={idAnciano}
                          observacionBaja={observacionBaja}
                        />
                      ) : null}
                    </div>
                    <div className="data-user-container">
                      <HiPencilAlt
                        className="pencil"
                        onClick={async () => {
                          setMore(!more);
                          const dataAnciano = await callAnciano(user.id, t);
                          idContribuyente == ""
                            ? setIdContribuyente(dataAnciano.idContribuyente)
                            : setIdContribuyente("");
                          const dominio = "http://192.168.10.82:4026/api";
                          const URLCuotas = `${dominio}/Cuotas/`;
                          const callLiquidacion = async () => {
                            const response = await fetch(
                              `${URLCuotas}${dataAnciano.idContribuyente}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${t}`,
                                },
                              }
                            );
                            if (!response.ok) {
                              return false;
                            } else {
                              const data = await response.json();
                              // console.log(data)
                              setLiquidacion(data);
                              return await data;
                            }
                          };
                          callLiquidacion(dataAnciano.idContribuyente, t);
                          // console.log(liquidacion)
                        }}
                      />
                    </div>
                    {more ? (
                      <ClientLiquidacion
                        setMore={setMore}
                        openSide={openSide}
                        liquidacion={liquidacion}
                        setLiquidacion={setLiquidacion}
                        idContribuyente={idContribuyente}
                        setIdContribuyente={setIdContribuyente}
                      />
                    ) : null}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
