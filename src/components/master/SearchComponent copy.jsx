import React from "react";
import Client from "./Client";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { HiArrowUp } from "react-icons/hi";
import Searcher from "./Searcher";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchComponent = ({ openSide }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(["id", true]);
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(true);

  const URL =
    "https://633ee4220dbc3309f3c04d34.mockapi.io/client-information/client-information";
  const callApi = async () => {
    setLoading(true);
    const response = await fetch(URL);
    const data = await response.json();
    data.map((e) => {
      let random = Math.random();
      let b = random < 0.5;
      e.payment = b;
      return e;
    });
    setUsers(data);
    setLoading(false);
    // console.log(data);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value)
  };

  const sorter = (field) => {
    setSortField([field, !sortField[1]]);
  };

  const results = !search
    ? users
    : users.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(sortField);
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
              ? { marginLeft: "200px", transition: ".3s ease" }
              : { marginLeft: "20px", transition: ".3s ease" }
          }
        />
      ) : (
        <div
          style={
            openSide
              ? { marginLeft: "200px", transition: ".3s ease" }
              : { marginLeft: "20px", transition: ".3s ease" }
          }
        >
          <Cards users={users} />
          <Searcher openSide={openSide} searcher={searcher}/>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      onClick={checked}
                      className="father-checkbox"
                    />
                  </th>
                  <th
                    onClick={() => sorter("id")}
                    style={{ cursor: "pointer" }}
                  >
                    Id
                    <HiArrowUp
                      style={
                        sortField[1] && sortField[0] === "id"
                          ? { transition: ".4s", transform: "rotate(180deg)" }
                          : { transition: ".4s", transform: "rotate(0deg)" }
                      }
                    />
                  </th>
                  <th
                    onClick={() => sorter("name")}
                    style={{ cursor: "pointer" }}
                  >
                    Nombre
                    <HiArrowUp
                      style={
                        sortField[1] && sortField[0] === "name"
                          ? { transition: ".4s", transform: "rotate(180deg)" }
                          : { transition: ".4s", transform: "rotate(0deg)" }
                      }
                    />
                  </th>
                  <th
                    onClick={() => sorter("city")}
                    style={{ cursor: "pointer" }}
                  >
                    Ciudad
                    <HiArrowUp
                      style={
                        sortField[1] && sortField[0] === "city"
                          ? { transition: ".4s", transform: "rotate(180deg)" }
                          : { transition: ".4s", transform: "rotate(0deg)" }
                      }
                    />
                  </th>
                  <th
                    onClick={() => sorter("date")}
                    style={{ cursor: "pointer" }}
                  >
                    Fecha
                    <HiArrowUp
                      style={
                        sortField[1] && sortField[0] === "date"
                          ? { transition: ".4s", transform: "rotate(180deg)" }
                          : { transition: ".4s", transform: "rotate(0deg)" }
                      }
                    />
                  </th>
                  <th
                    onClick={() => {
                      sorter("payment");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Pago
                    <HiArrowUp
                      style={
                        sortField[1] && sortField[0] === "payment"
                          ? { transition: ".4s", transform: "rotate(180deg)" }
                          : { transition: ".4s", transform: "rotate(0deg)" }
                      }
                    />
                  </th>
                  <th
                    onClick={() => sorter("total")}
                    style={{ cursor: "pointer" }}
                  >
                    Monto
                    <HiArrowUp
                      style={
                        sortField[1] && sortField[0] === "total"
                          ? { transition: ".4s", transform: "rotate(180deg)" }
                          : { transition: ".4s", transform: "rotate(0deg)" }
                      }
                    />
                  </th>
                </tr>
              </thead>
              {results.map((user) => (
                <Client key={user.name} user={user} />
              ))}
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
