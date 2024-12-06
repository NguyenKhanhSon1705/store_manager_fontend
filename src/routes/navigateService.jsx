let navigate;

export const setNavigate = (navFunc) => {
  navigate = navFunc;
};

export const navigateTo = (path, options = {}) => {
  if (!navigate) {
    throw new Error("Navigate function is not set.");
  }
  navigate(path, options);
};
