const dominio = "http://192.168.10.82:4026/api";

const URLContribuyente = `${dominio}/Contribuyentes`;
export const callContribuyente = async (toSearch, t) => {
  const response = await fetch(`${URLContribuyente}?name=${toSearch}`, {
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

const URLAncianos = `${dominio}/Ancianos`;
export const callAncianos = async (toSearch, t) => {
  const response = await fetch(`${URLAncianos}?name=${toSearch}`, {
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

const URLAnciano = `${dominio}/Ancianos/`;
export const callAnciano = async (idContribuyente, t) => {
  const response = await fetch(`${URLAnciano}${idContribuyente}`, {
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

const URLCreateCuota = `${dominio}/Cuotas`;
export const saveLiquidacion = async (idContr, numCuota, per, imp, t) => {
  const credenciales = {
    idContribuyente: idContr,
    numeroCuota: numCuota,
    periodo: per,
    importe: imp,
  };
  const response = await fetch(URLCreateCuota, {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${t}`,
    },
  });
  return response.ok;
};

const URLCreateAnciano = `${dominio}/Ancianos`;
export const saveContribuyente = async (id, ord, bool, nom, ape, tel, t) => {
  const credenciales = {
    idContribuyente: id,
    orden: ord,
    ayudaSocial: bool,
    responsable: {
      nombre: nom,
      apellido: ape,
      telefono: tel,
    },
  };
  const response = await fetch(URLCreateAnciano, {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${t}`,
    },
  });
  return response.ok;
};
