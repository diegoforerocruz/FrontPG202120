const API_URL = "https://pgkmc.herokuapp.com/variables";
const ALL_URL = `${API_URL}/all`;
const UPDATE_URL = (nombre_variable) => `${API_URL}/update/${nombre_variable}`;

export const getVariables = async () => {
  return fetch(ALL_URL).then((res) => {
    return res.json();
  });
};

export const updateVariable = async (name, body) => {
  return fetch(UPDATE_URL(name), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(status)
    .then((res) => res.json())
    .catch(function (error) {
      console.log("Error", error);
    });
};

function status(response) {
  if (response.ok) {
    return response;
  }
  return response.json().then((res) => Promise.reject(res));
}
