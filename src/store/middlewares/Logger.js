export const actionLogger = (store) => {
  return (next) => {
    return (action) => {
      console.log("actionType: ", action.type);

      return next(action);
    };
  };
};
