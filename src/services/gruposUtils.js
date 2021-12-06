const API_URL = "http://localhost:5000/grupos";
const ALL_URL = `${API_URL}/all`;
const CREATE_URL = `${API_URL}/create`;
const BINS_URL = (bins,variable,tipo) => `${API_URL}/nivel/${bins}/${variable}/${tipo}`;

export const getBins = async (bins,variable,tipo,conditions) => {
  return fetch(BINS_URL(bins,variable,tipo), {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(conditions),
  }).then(status)
    .then(res => res.json())
    .catch(function(error) {
        console.log("Error", error);
    });
};

export const createGroup = async (conditions) => {
  return fetch(CREATE_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(conditions),
  }).then((res) => {
    return res.json();
  });
};



function status(response) {   
    if (response.ok) {
        return response;
    }
    return response.json().then(res => Promise.reject(res));
}