export const enviromentvars = [
  {
    label: "situación pareja",
    value: "CSP_SituaPareja",
    tipo: 2,
  },
  {
    label: "tipo de vivienda",
    value: "CSP_TipoVivienda",
    tipo: 2,
  },
  {
    label: "Escolaridad madre",
    value: "CSP_EscolaridadMadre",
    tipo: 2,
  },
  {
    label: "Situación laboral madre",
    value: "CSP_SituacionLaboralMadre",
    tipo: 2,
  },
  {
    label: "Escolaridad padre",
    value: "CSP_EscolaridadPadre",
    tipo: 2,
  },
  {
    label: "Situación laboral padre",
    value: "CSP_SituacionLaboralPadre",
    tipo: 2,
  },
  {
    label: "Ingreso Mensual",
    value: "CSP_IngresoMensual",
    tipo: 1,
  },
  {
    label: "Distancia vivienda",
    value: "CSP_DistanciaVivienda",
    tipo: 2,
  },
  {
    label: "Personas que viven en el hogar con el ingreso",
    value: "CSP_numPersVivenIngMen",
    tipo: 1,
  },
  {
    label: "Nutrición familiar",
    value: "CSP_NutricionFam",
    tipo: 2,
  },
  {
    label: "embarazo deseado",
    value: "CSP_EmbarazoDeseado",
    tipo: 2,
  },
  {
    label: "embarazo planificado",
    value: "embbajoplanificacion",
    tipo: 2,
  },
  {
    label: "Peso de la madre",
    value: "CP_PesoMadre",
    tipo: 1,
  },
  {
    label: "Talla de la madre",
    value: "CP_TallaMadre",
    tipo: 1,
  },
  {
    label: "Peso del padre",
    value: "CP_PesoPadre",
    tipo: 1,
  },
  {
    label: "Talla del padre",
    value: "CP_TallaPadre",
    tipo: 1,
  },
  {
    label: "hay niños menores de 5 años en el hogar",
    value: "ninosmenosde5anos",
    tipo: 2,
  },
  {
    label: "percapita\nmensual",
    value: "percapita",
    tipo: 1,
  },
  {
    label: "percapita mensual (cat)",
    value: "percapindic",
    tipo: 2,
  },
  {
    label: "Escolaridad madre\nsimpl.",
    value: "educmadresimplificada",
    tipo: 2,
  },
  {
    label: "Escolaridad padre\nsimpl.",
    value: "educpadresimplificada",
    tipo: 2,
  },
  {
    label: "edad materna",
    value: "CP_edadmaterna",
    tipo: 1,
  },
  {
    label: "edad madre\ncategorizada",
    value: "edadmatcat",
    tipo: 2,
  },
  {
    label: "Sistema de Salud",
    value: "SSalud",
    tipo: 2,
  },
  {
    label: "Número de embarazos (con este)",
    value: "CP_Gestacion",
    tipo: 1,
  },
  {
    label: "Número de partos",
    value: "CP_Paridad",
    tipo: 1,
  },
  {
    label: "Número de cesáreas",
    value: "CP_PartoCesarea",
    tipo: 1,
  },
  {
    label: "Número de emb. ectópicos",
    value: "CP_Ectopico",
    tipo: 1,
  },
  {
    label: "Número de nacidos vivos",
    value: "CP_NacidoVivo",
    tipo: 1,
  },
  {
    label: "Número de prematuros",
    value: "CP_Prematuro",
    tipo: 1,
  },
  {
    label: "Número de mortinatos",
    value: "CP_Mortinato",
    tipo: 1,
  },
  {
    label: "Número de emb. planificados con hormonas",
    value: "CP_Hormonales",
    tipo: 1,
  },
  {
    label: "Número de emb. planificados con DIU",
    value: "CP_DIU",
    tipo: 1,
  },
  {
    label: "tuvo embarazos\nbajo DIU",
    value: "embarazoplanifDIU",
    tipo: 2,
  },
  {
    label: "tuvo embarazos\nbajo hormonas",
    value: "embarazoplanifhormonal",
    tipo: 2,
  },
];

export const envaroptions = [
  {
    nombre: "CSP_SituaPareja",
    options: [
      { value: 1, label: "sola con apoyo" },
      { value: 2, label: "sola sin apoyo" },
      { value: 3, label: "pareja estable" },
    ],
  },
  {
    nombre: "CSP_TipoVivienda",
    options: [
      { value: 1, label: "rural" },
      { value: 2, label: "urbana" },
    ],
  },
  {
    nombre: "CSP_EscolaridadMadre",
    options: [
      { value: 1, label: "primaria completa o no" },
      { value: 2, label: "primaria incompleta" },
      { value: 3, label: "secundaria completa o no" },
      { value: 4, label: "secundaria incompleta" },
      { value: 5, label: "tecnica completa o no" },
      { value: 6, label: "tecnica incompleta" },
      { value: 7, label: "universitaria completa o no" },
      { value: 8, label: "universitaria incompleta" },
    ],
  },
  {
    nombre: "CSP_SituacionLaboralMadre",
    options: [
      { value: 1, label: "con empleo" },
      { value: 2, label: "sin empleo" },
      { value: 3, label: "ama de casa" },
      { value: 4, label: "estudiante" },
    ],
  },
  {
    nombre: "CSP_EscolaridadPadre",
    options: [
      { value: 1, label: "primaria completa o no" },
      { value: 2, label: "primaria incompleta" },
      { value: 3, label: "secundaria completa o no" },
      { value: 4, label: "secundaria incompleta" },
      { value: 5, label: "tecnica completa o no" },
      { value: 6, label: "tecnica incompleta" },
      { value: 7, label: "universitaria completa o no" },
      { value: 8, label: "universitaria incompleta" },
    ],
  },
  {
    nombre: "CSP_SituacionLaboralPadre",
    options: [
      { value: 0, label: "NA" },
      { value: 1, label: "con empleo" },
      { value: 2, label: "sin empleo" },
      { value: 3, label: "estudiante" },
    ],
  },
  {
    nombre: "CSP_DistanciaVivienda",
    options: [
      { value: 1, label: "hasta una hora de transporte" },
      { value: 2, label: "de 1 a 2 horas de transporte" },
      { value: 3, label: "mas de 2 horas pero en la ciudad" },
      { value: 4, label: "fuera de la ciudad" },
    ],
  },
  {
    nombre: "CSP_NutricionFam",
    options: [
      { value: 1, label: "buena (3 comidas y 2 refrigerios)" },
      { value: 2, label: "apenas suficiente (3 comidas)" },
      { value: 3, label: "insuficiente (2 comidas)" },
      { value: 4, label: "severamente insuficiente (1 comida)" },
    ],
  },
  {
    nombre: "CSP_EmbarazoDeseado",
    options: [
      { value: 0, label: "no" },
      { value: 1, label: "si" },
    ],
  },
  {
    nombre: "embbajoplanificacion",
    options: [
      { value: 0, label: "no" },
      { value: 1, label: "si" },
    ],
  },
  {
    nombre: "ninosmenosde5anos",
    options: [
      { value: 0, label: "no" },
      { value: 1, label: "si" },
    ],
  },
  {
    nombre: "percapindic",
    options: [
      { value: 1, label: "hasta 1 SM percapita mensual" },
      { value: 2, label: "hasta 2 SM percapita mensual" },
      { value: 3, label: "hasta 3 SM percapita mensual" },
      { value: 4, label: "mas de 3 SM percapita mensual" },
    ],
  },
  {
    nombre: "edadmatcat",
    options: [
      { value: 1, label: "adolescente" },
      { value: 2, label: "normal" },
      { value: 3, label: "mas de 35 años" },
    ],
  },
  {
    nombre: "SSalud",
    options: [
      { value: 0, label: "prepagada" },
      { value: 2, label: "contributivo" },
      { value: 3, label: "subsidiado" },
    ],
  },
];
