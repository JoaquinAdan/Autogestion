const URL = "http://192.168.10.82:4026/api/Auth/create";
export const callUser = async (user, pass) => {
  const credenciales = {
    username: user,
    password: pass,
  };
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) {
    return null;
  }
  return await response.json();
};

export default callUser
  