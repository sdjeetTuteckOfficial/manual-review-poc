export const test = (data) => {
  console.log("action", data);
  return {
    type: "TEST",
    payload: {
      data: data,
    },
  };
};

export const addCorordinates = (data) => {
  console.log(data);
  return {
    type: "ADD_COORDINATES",
    payload: {
      data: data,
    },
  };
};
