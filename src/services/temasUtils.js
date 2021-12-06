const API_URL = "http://localhost:5000/temas";
const ALL_URL = `${API_URL}/all`;
const ALLVARS_URL = `${API_URL}/allvariables`;

export const getTemasVariables= async () => {
  return fetch(ALLVARS_URL).then((res) => {
    return res.json();
  });
};

export const getTemas= async () => {
  return fetch(ALL_URL).then((res) => {
    return res.json();
  });
};