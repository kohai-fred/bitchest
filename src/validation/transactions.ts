export const BUY_RULES = {
  required: "Vous devez définir une quantité",
  min: {
    value: 0.01,
    message: "La quantité ne peut null ou négative",
  },
  pattern: {
    value: /^\d+(\.\d{1,2})?$/,
    message: "2 chiffres maximum après la virgule",
  },
};
