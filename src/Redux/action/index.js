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

export const editNewCoordinates = (data, imageId) => {
  console.log("edit action", data);
  return {
    type: "EDIT_COORDINATE",
    payload: {
      data: data,
      imageId: imageId,
    },
  };
};
