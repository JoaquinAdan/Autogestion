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
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(["id", true]);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [baja, setBaja] = useState(false);
  const [idContribuyente, setIdContribuyente] = useState("")
  const t = localStorage.getItem("token");

  const searcher = async (e) => {
    if (e.target.value.length != []) {
      let ancianos = await callAncianos(e.target.value, t);
      setUsers(ancianos);
    } else {
      setUsers([]);
    }
    console.log(search);
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
    setLoading(true);
    setLoading(false);
    // callApi();
  }, []);

  return (
    <>
      {loading ? (
        <img
          src="spinner.svg"
          style={
            openSide
              ? {
                  transition: ".3s ease",
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  left: "200px",
                  right: "0",
                  margin: "auto",
                }
              : {
                  transition: ".3s ease",
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  left: "20px",
                  right: "0",
                  margin: "auto",
                }
          }
        />
      ) : (
        <div
          style={
            openSide
              ? { marginLeft: "200px", transition: ".3s ease", width: "90%" }
              : { marginLeft: "0px", transition: ".3s ease", width: "100%" }
          }
        >
          <Cards users={users} />
          <Searcher openSide={openSide} searcher={searcher} />
          <div className="table-container">
            <div className="thead-container">
              <div className="data-head-user" onClick={() => sorter("id")}>
                <div className="title-table-container">
                  ID°
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "id"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    {user.id}
                  </div>
                ))}
              </div>
              <div
                className="data-head-user"
                onClick={() => sorter("nombre")}
                style={{ width: "250px" }}
              >
                <div className="title-table-container">
                  <img
                    src="nombre.svg"
                    alt="nombre"
                    className="icon-title-table"
                  />
                  Nombre
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "nombre"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="data-user-container user-nombre"
                  >
                    {user.nombre.toLowerCase()} {user.apellido?.toLowerCase()}
                  </div>
                ))}
              </div>
              <div
                onClick={() => sorter("cuit")}
                className="data-head-user"
                style={{ width: "180px" }}
              >
                <div className="title-table-container">
                  <img src="cuit.svg" alt="cuit" className="icon-title-table" />
                  Cuit
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "cuit"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    {user.cuit}
                  </div>
                ))}
              </div>
              <div
                onClick={() => sorter("fechaAlta")}
                className="data-head-user"
                style={{ width: "180px" }}
              >
                <div className="title-table-container">
                  <img
                    src="fechaalta.svg"
                    alt="fecha alta"
                    className="icon-title-table"
                  />
                  Fecha alta
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "fechaAlta"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    {user.fechaAlta.slice(0, 10)}
                  </div>
                ))}
              </div>
              <div
                onClick={() => {
                  sorter("fechaBaja");
                }}
                className="data-head-user"
                style={{ width: "180px" }}
              >
                <div className="title-table-container">
                  <img
                    src="fechabaja.svg"
                    alt="fecha baja"
                    className="icon-title-table"
                  />
                  Fecha baja
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "fechaBaja"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    {user.fechaBaja === null
                      ? "Vivo"
                      : user.fechaBaja.slice(0, 10)}
                  </div>
                ))}
              </div>
              <div onClick={() => sorter("baja")} className="data-head-user">
                <div className="title-table-container">
                  <img src="baja.svg" alt="baja" className="icon-title-table" />
                  Baja
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "baja"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div key={user.id}>
                    <div
                      className="data-user-container"
                      onClick={() => setBaja(!baja)}
                    >
                      {user.fechaBaja === null ? "No" : "Si" + " "}
                      <RiInformationLine className="pencil" />
                    </div>
                    {baja ? (
                      <ClientBaja setBaja={setBaja} openSide={openSide} />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="data-head-user">
                <div className="title-table-container">
                  <img
                    src="liquidacion.svg"
                    alt="liquidacion"
                    className="icon-title-table"
                  />
                  Liquidación
                </div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    <div>
                      <div
                        className="pencil"
                        onClick={async () => {
                          setMore(!more);
                          const dataAnciano = await callAnciano(user.id, t);
                          idContribuyente == "" ? setIdContribuyente(dataAnciano.idContribuyente) : setIdContribuyente("")
                        }}
                      >
                        <HiPencilAlt />
                      </div>
                    </div>
                    
                  </div>
                ))}
                {more ? (
                      <ClientLiquidacion
                        setMore={setMore}
                        openSide={openSide}
                        idContribuyente={idContribuyente}
                        setIdContribuyente={setIdContribuyente}
                      />
                    ) : null}
              </div>
            </div>
            {/* <div className="tbody-container">
              {users.map((user) => (
                <Client key={user.id} user={user} openSide={openSide} />
              ))}
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
