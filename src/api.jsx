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

const URLCuotas = `${dominio}/Cuotas/`;
export const callLiquidacion = async (idContribuyente, t) => {
  const response = await fetch(`${URLCuotas}${idContribuyente}`, {
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

const URLCreate = `${dominio}/Ancianos`;
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
  const response = await fetch(URLCreate, {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${t}`,
    },
  });
  return response.ok;
};
