export const FORM_VALIDATIONS = {
  name: {
    required: "Name is required",
    minLength: {
      value: 5,
      message: "name must be at least 5 characters",
    },
    maxLength: {
      value: 15,
      message: "name must be Greater then 10 characters",
    },
  },

  username: {
    required: "username is required",
    minLength: {
      value: 5,
      message: "username must be at least 5 characters",
    },
    maxLength: {
      value: 15,
      message: "username must be Greater then 10 characters",
    },
    pattern: {
      value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
      message: "don't use space ",
    },
  },

  email: {
    required: "Email is required",
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter a valid email",
    },
  },

  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
    maxLength: {
      value: 15,
      message: "Password must have Greater then 15 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message:
        "password must have one uppercase, lowercase letter and one digit",
    },
  },
};

export const ARTICLE_VALIDATION = {
  title: {
    required: "title is required",
    minLength: {
      value: 10,
      message: "title must be at least 10 characters",
    },
    maxLength: {
      value: 100,
      message: "title at least 100 characters",
    },
  },
  content: {
    required: "content is required",
    minLength: {
      value: 10,
      message: "content must be at least 40 characters",
    },
    maxLength: {
      value: 300,
      message: "content must be Greater then 100 characters",
    },
  },
  description: {
    required: "description is required",
    minLength: {
      value: 10,
      message: "description must be at least 50 characters",
    },
    maxLength: {
      value: 1000,
      message: "description must be Greater then 500 characters",
    },
  },
};