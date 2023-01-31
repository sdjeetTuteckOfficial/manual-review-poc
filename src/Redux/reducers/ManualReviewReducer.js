import { v4 as uuidv4 } from "uuid";
const initialData = {
  activeFlag: false,
  currentIndex: "",
  data: [],
  masterData: [
    {
      name: "First Name",
      value: 10,
    },
    {
      name: "Last Name",
      value: 20,
    },
    {
      name: "Age",
      value: 30,
    },
    {
      name: "Gender",
      value: 40,
    },
    {
      name: "Id",
      value: 50,
    },
  ],
};

const ManualReviewReducers = (state = initialData, action) => {
  switch (action.type) {
    case "LOAD_INITIAL_DATA":
      const { data, initialIndex } = action.payload;
      return {
        ...state,
        data: data,
        currentIndex: initialIndex,
      };
    case "ACTIVE_FLAG_FALSE":
      console.log("ACTIVE_FLAG_FALSE");
      // const { flag } = action.payload;
      return {
        ...state,
        activeFlag: false,
      };

    case "CHANGE_IMAGE_INDEX":
      const { index } = action.payload;
      return {
        ...state,
        currentIndex: index,
      };
    case "ADD_COORDINATES":
      const values = action.payload;
      console.log("bro I am here", values.data);
      const co_id = uuidv4();
      const coordObj = {
        height: (values.data.height / values.data.heightRatio).toFixed(2),
        width: (values.data.width / values.data.widthRatio).toFixed(2),
        x: (values.data.x / values.data.widthRatio).toFixed(2),
        y: (values.data.y / values.data.heightRatio).toFixed(2),
        co_id: co_id,
      };
      const fieldData = {
        co_id: co_id,
        name: values.data.keyName,
        value: values.data.text,
        coordinates: coordObj,
      };
      console.log("filedData", fieldData);

      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === values.imageId) {
          state.data[i].fields.push(fieldData);
          state.activeFlag = true;
          return {
            ...state,
            activeFlag: true,
          };
        }
      }
      break;

    case "EDIT_COORDINATE":
      const editValues = action.payload;
      console.log("edit reducer", editValues);
      const coordObjEdit = {
        height: (editValues.data.height / editValues.data.heightRatio).toFixed(
          2
        ),
        width: (editValues.data.width / editValues.data.widthRatio).toFixed(2),
        x: (editValues.data.x / editValues.data.widthRatio).toFixed(2),
        y: (editValues.data.y / editValues.data.heightRatio).toFixed(2),
        co_id: editValues.data.co_id,
      };

      const fieldDataEdit = {
        co_id: editValues.data.co_id,
        name: editValues.data.keyName,
        value: editValues.data.text,
        coordinates: coordObjEdit,
      };
      console.log("filedData", fieldDataEdit);

      state.data.map((currState) => {
        if (currState.id === editValues.imageId) {
          const index = currState.fields.findIndex(
            (item) => editValues.data.co_id === item.co_id
          );
          console.log("index", index);
          if (index !== -1) {
            currState.fields.splice(index, 1);
            console.log("cur state", currState);
          }
          currState.fields.push(fieldDataEdit);

          return {
            ...state,
            activeFlag: true,
          };
        }
      });
      // break;
      return {
        ...state,
        activeFlag: true,
      };

    case "EDIT_VALUE":
      const editedValue = action.payload;
      console.log("edited redux", editedValue);

      state.data.map((currState) => {
        if (currState.id === editedValue.imageId) {
          const index = currState.fields.findIndex(
            (item) => editedValue.data.co_id === item.co_id
          );
          console.log("index", index);
          if (index !== -1) {
            currState.fields.splice(index, 1);
            console.log("cur state", currState);
          }
          currState.fields.push(editedValue.data);

          return {
            ...state,
            activeFlag: true,
          };
        }
      });
      return {
        ...state,
        activeFlag: true,
      };

    case "DELETE_COORDINATE":
      const delData = action.payload;

      state.data.map((currState) => {
        if (currState.id === delData.imageId) {
          const index = currState.fields.findIndex(
            (item) => delData.delId === item.co_id
          );
          console.log("index", index);
          if (index !== -1) {
            currState.fields.splice(index, 1);
            console.log("cur state", currState);
            return {
              ...state,
              activeFlag: true,
            };
          }
        }
      });
      return {
        ...state,
        activeFlag: true,
      };

    // break;

    default:
      return state;
  }
};

export default ManualReviewReducers;
