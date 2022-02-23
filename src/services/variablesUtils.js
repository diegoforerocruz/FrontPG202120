const API_URL = "http://localhost:5000/variables";
const ALL_URL = `${API_URL}/all`;
const DELETE_URL = (gId) => `${API_URL}/delete/${gId}`;
const UPDATE_URL = (nombre_variable) => `${API_URL}/update/${nombre_variable}`;
const CREATE_URL = `${API_URL}/create`;

export const getVariables = async () => {
  return fetch(ALL_URL).then((res) => {
    return res.json();
  });
};

export const deleteVariable = async (gId) => {
  return fetch(DELETE_URL(gId),{
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json"
    },
  }).then(status).then((res) => {
    return res.json();
  });
};

export const updateVariable = async (name,body) => {
  return fetch(UPDATE_URL(name), {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  }).then(status)
    .then(res => res.json())
    .catch(function(error) {
        return error;
    });
};

export const createVariable = async (body) => {
  return fetch(CREATE_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  }).then(status)
    .then(res => res.json())
    .catch(function(error) {
        return error;
    });
};

function status(response) {   
    if (response.ok) {
        return response;
    }
    return response.json().then(res => Promise.reject(res));
}