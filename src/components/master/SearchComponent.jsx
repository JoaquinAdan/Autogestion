import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import ClientMore from "./ClientMore";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { HiArrowUp } from "react-icons/hi";
import Searcher from "./Searcher";
import "bootstrap/dist/css/bootstrap.min.css";
import { callAncianos } from "../../api";

const SearchComponent = ({ openSide }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(["id", true]);
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const t = localStorage.getItem("token");

  // const URL =
  //   "https://633ee4220dbc3309f3c04d34.mockapi.io/client-information/client-information";
  // const callApi = async () => {
  //   setLoading(true);
  //   const response = await fetch(URL);
  //   const data = await response.json();
  //   data.map((e) => {
  //     let random = Math.random();
  //     let b = random < 0.5;
  //     e.payment = b;
  //     return e;
  //   });
  //   setUsers(data);
  //   setLoading(false);
  //   // console.log(data);
  // };

  const searcher = async (e) => {
    let ancianos = await callAncianos(e.target.value, t);
    setUsers(ancianos);
    console.log(search);
    // console.log(e.target.value)
  };

  const sorter = (field) => {
    setSortField([field, !sortField[1]]);
  };
  // console.log(users);
  const results = !search
    ? users
    : users.filter((dato) =>
        dato.cuit.toString().toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    // callApi();
    setLoading(true);
    setLoading(false);
  }, []);

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

  const checkAll = () => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach(function (checkElement) {
        checkElement.checked = true;
      });
  };
  const uncheckAll = () => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach(function (checkElement) {
        checkElement.checked = false;
      });
  };
  const checked = () => {
    setCheck(!check);
    check ? checkAll() : uncheckAll();
  };

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
                <div>
                  ID
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "id"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                
              </div>

              <div
                className="data-head-user"
                onClick={() => sorter("name")}
                style={{ flex: 0.8 }}
              >
                <div>
                  Nombre
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "name"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    {user.nombre}
                  </div>
                ))}
              </div>
              <div onClick={() => sorter("cuit")} className="data-head-user">
                <div>
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
                onClick={() => sorter("datealta")}
                className="data-head-user"
              >
                <div>
                  Fecha alta
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "datealta"
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
                  sorter("datebaja");
                }}
                className="data-head-user"
              >
                <div>
                  Fecha baja
                  <HiArrowUp
                    style={
                      sortField[1] && sortField[0] === "datebaja"
                        ? { transition: ".4s", transform: "rotate(180deg)" }
                        : { transition: ".4s", transform: "rotate(0deg)" }
                    }
                  />
                </div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    {user.fechaBaja === null ? "Vivo" : user.fechaBaja}
                  </div>
                ))}
              </div>
              <div onClick={() => sorter("baja")} className="data-head-user">
                <div>
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
                  <div key={user.id} className="data-user-container">
                    {user.fechaBaja === null ? "No" : "si"}
                  </div>
                ))}
              </div>
              <div className="data-head-user">
                <div>Liquidación</div>
                {users.map((user) => (
                  <div key={user.id} className="data-user-container">
                    <div>
                      <div
                        className="data-user-container pencil"
                        onClick={() => setMore(!more)}
                      >
                        <HiPencilAlt />
                      </div>
                    </div>
                    {more ? (
                      <ClientMore setMore={setMore} openSide={openSide} />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="tbody-container">
              {/* {users.map((user) => (
                <Client key={user.id} user={user} openSide={openSide} />
              ))} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
