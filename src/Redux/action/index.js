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

export const activeFlagFalse = () => {
  return {
    type: "ACTIVE_FLAG_FALSE",
  };
};

export const loadInitialData = (data, initialIndex) => {
  return {
    type: "LOAD_INITIAL_DATA",
    payload: {
      data: data,
      initialIndex: initialIndex,
    },
  };
};

export const changeImageIndex = (index) => {
  return {
    type: "CHANGE_IMAGE_INDEX",
    payload: {
      index: index,
    },
  };
};

export const editValue = (data, imageId) => {
  return {
    type: "EDIT_VALUE",
    payload: {
      data: data,
      imageId: imageId,
    },
  };
};
