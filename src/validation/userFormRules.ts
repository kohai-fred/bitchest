export const USER_FORM_RULES = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-_]+\.[a-zA-Z]{2,10}$/,
      message: "L'email n'est pas valid",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message:
        "8 caract. min. et au moins 1 chiffre, 1 minuscule et 1 majuscule",
    },
  },
  name: {
    pattern: {
      // value: /\p{L}+/, //Does not work with react-hook-form...
      value:
        /^[\sa-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]+$/i,
      message: "Le champ ne peut contenir que des lettres",
    },
  },
};

export const MESSAGE_EMAIL_IS_TAKEN = "Désolé cet email est déjà utilisé.";
