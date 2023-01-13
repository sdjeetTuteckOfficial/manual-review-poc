import screenshot from "./../../assets/screenshot.svg";
import aadhar from "./../../assets/adhaar.jpg";
const initialData = {
  test: "1234",
  data: [
    {
      id: 1,
      url: screenshot,
      fields: {
        name: {
          value: "Shubhajeet Das",
          coordinates: { x: "118", y: "65", width: "40", height: "14" },
        },
        billId: {
          value: "123456789012",
          coordinates: { x: "230", y: "156", width: "150", height: "20" },
        },
      },
    },
    {
      id: 2,
      url: aadhar,
      fields: {
        name: {
          value: "IDOCUSENSE",
          coordinates: { x: "118", y: "65", width: "40", height: "14" },
        },
        aadharId: {
          value: "123456789012",
          coordinates: { x: "230", y: "156", width: "150", height: "20" },
        },
      },
    },
  ],
};

const ManualReviewReducers = (state = initialData, action) => {
  switch (action.type) {
    case "TEST":
      const { data } = action.payload;
      console.log("inside hell", data);
      return {
        ...state,
        test: data,
      };

    case "ADD_FIELDS":
      const { values, id } = action.payload;
      const selectedFile = state.data.find((file) => file.id === id);
      console.log("selected file", selectedFile);

      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ManualReviewReducers;
