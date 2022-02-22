const API_URL = "https://pgkmc.herokuapp.com/grupos";
const ALL_URL = `${API_URL}/all`;
const CLUSTERALL_URL = `${API_URL}/clusterall`;
const CREATE_URL = `${API_URL}/create`;
const DELETE_URL = (gID) => `${API_URL}/delete/${gID}`;
const DELETE_CLUSTER_URL = (gID) => `${API_URL}/deletecluster/${gID}`;
const BINS_URL = (bins, variable, tipo, grupoescogido) =>
  `${API_URL}/nivel/${bins}/${variable}/${tipo}/${grupoescogido}`;

export const getGruposCluster = async () => {
  return fetch(CLUSTERALL_URL).then((res) => {
    return res.json();
  });
};

export const getGrupos = async () => {
  return fetch(ALL_URL).then((res) => {
    return res.json();
  });
};

export const deleteGrupo = async (gId) => {
  return fetch(DELETE_URL(gId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(status)
    .then((res) => {
      return res.json();
    });
};

export const deleteGrupoCluster = async (gId) => {
  return fetch(DELETE_CLUSTER_URL(gId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(status)
    .then((res) => {
      return res.json();
    });
};

export const getBins = async (
  bins,
  variable,
  tipo,
  conditions,
  grupoescogido
) => {
  return fetch(BINS_URL(bins, variable, tipo, grupoescogido), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conditions),
  })
    .then(status)
    .then((res) => res.json())
    .catch(function (error) {
      console.log("Error", error);
    });
};

export const createGroup = async (conditions) => {
  return fetch(CREATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  return response.json().then((res) => Promise.reject(res));
}
