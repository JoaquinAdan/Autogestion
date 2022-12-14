import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import ClientLiquidacion from "./ClientLiquidacion";
import ClientBaja from "./ClientBaja";
import { useEffect, useState, useMemo } from "react";
import Cards from "./Cards";
import { HiArrowUp } from "react-icons/hi";
import Searcher from "./Searcher";
import "bootstrap/dist/css/bootstrap.min.css";
// import { callAncianos } from "../../api";
import { RiInformationLine } from "react-icons/ri";
import { callAnciano } from "../../api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const FechaA = (p) => {
  return <div>{p.value.slice(0, 10)}</div>;
};

const FechaB = ({ bajaAnciano, setBajaAnciano, openSide }) => {
  return (
    <>
      <ClientBaja
        setBaja={() => setBajaAnciano(null)}
        openSide={openSide}
        idAnciano={bajaAnciano.id}
        observacionBaja={bajaAnciano.observaciones}
        userName={bajaAnciano.nombre}
      />
    </>
  );
};

const Liquidacion = ({
  liquidacionAnciano,
  setLiquidacionAnciano,
  openSide,
  liquidacion,
}) => {
  return (
    <>
      <ClientLiquidacion
        setMore={() => setLiquidacionAnciano(null)}
        openSide={openSide}
        liquidacion={liquidacion}
        idContribuyente={liquidacionAnciano.idContribuyente}
      />
    </>
  );
};
const SearchComponent = ({ openSide }) => {
  const [idContribuyente, setIdContribuyente] = useState("");
  const [liquidacion, setLiquidacion] = useState("");
  const [bajaAnciano, setBajaAnciano] = useState(null);
  const [liquidacionAnciano, setLiquidacionAnciano] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", headerName: "Id°" },
    {
      field: "nombre",
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <img src="/nombre.svg" alt="icono de la tabla" class="icon-title-table"/> ' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
      valueGetter: (p) => {
        const nombre = p.data.nombre.toLowerCase() || "";
        const apellido =
          p.data.apellido === null ? "" : p.data.apellido.toLowerCase();
        return nombre + " " + apellido;
      },
    },
    {
      field: "cuit",
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <img src="/cuit.svg" alt="icono de la tabla" class="icon-title-table"/> ' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
    },
    {
      field: "fechaAlta",
      cellRenderer: FechaA,
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <img src="/fechaalta.svg" alt="icono de la tabla" class="icon-title-table"/> ' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
    },
    {
      field: "fechaBaja",
      cellRenderer: (p) => (
        <div>
          {p.value === null ? "Vivo" : p.value.slice(0, 10)}
          <RiInformationLine
            className="pencil"
            onClick={() =>
              setBajaAnciano({
                id: p.data.id,
                username: p.data.nombre,
                observaciones: p.data.observacionesBaja,
                fechaBaja: p.data.fechaBaja,
              })
            }
          />
        </div>
      ),
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <img src="/fechabaja.svg" alt="icono de la tabla" class="icon-title-table"/> ' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
    },
    {
      field: "liquidacion",
      cellRenderer: (p) => {
        return (
          <HiPencilAlt
            className="pencil"
            onClick={async () => {
              const dominio = "http://192.168.10.82:4026/api";
              const URLCuotas = `${dominio}/Cuotas/`;
              const callLiquidacion = async () => {
                const response = await fetch(
                  `${URLCuotas}${p.data.idContribuyente}`,
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
                  // console.log(data);
                  setLiquidacion(data);
                  return await data;
                }
              };
              callLiquidacion(p.data.idContribuyente, t);
              setIdContribuyente(p.data.idContribuyente);
              setLiquidacionAnciano({
                id: p.data.id,
                idcontribuyente: idContribuyente,
                liquidacion: liquidacion,
              });
            }}
          />
        );
      },
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <img src="/liquidacion.svg" alt="icono de la tabla" class="icon-title-table"/> ' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );
  const t = localStorage.getItem("token");

  const dataGrid = async () => {
    const dominio = "http://192.168.10.82:4026/api";
    const URLAncianos = `${dominio}/Ancianos`;
    const callAncianos = async (t) => {
      const response = await fetch(`${URLAncianos}`, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
      if (!response.ok) {
        return false;
      } else {
        const data = await response.json();
        return await data;
      }
    };
    let dataAncianos = await callAncianos(t);
    // console.log(dataAncianos);
    // console.log(dataAncianos);
    setRowData(dataAncianos);
  };

  useEffect(() => {
    dataGrid();
    // callApi();
  }, []);

  return (
    <>
      {!bajaAnciano ? null : (
        <FechaB
          bajaAnciano={bajaAnciano}
          setBajaAnciano={setBajaAnciano}
          openSide={openSide}
        />
      )}
      {!liquidacionAnciano ? null : (
        <Liquidacion
          liquidacionAnciano={liquidacionAnciano}
          setLiquidacionAnciano={setLiquidacionAnciano}
          liquidacion={liquidacion}
          openSide={openSide}
        />
      )}
      <div
        style={
          openSide
            ? {
                marginLeft: "100px",
                transition: ".3s ease",
                width: "101%",
              }
            : {
                marginLeft: "0px",
                transition: ".3s ease",
                width: "101%",
              }
        }
      >
        <Cards users={rowData} />
        <Searcher openSide={openSide} />
        <div className="ag-theme-alpine" style={{ height: 550 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection="multiple"
            animateRows={true}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
