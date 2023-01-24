export const test = (data) => {
  console.log("action", data);
  return {
    type: "TEST",
    payload: {
      data: data,
    },
  };
};

export const addNewCorordinates = (data, imageId) => {
  console.log("cal", data);
  return {
    type: "ADD_COORDINATES",
    payload: {
      data: data,
      imageId: imageId,
    },
  };
};
