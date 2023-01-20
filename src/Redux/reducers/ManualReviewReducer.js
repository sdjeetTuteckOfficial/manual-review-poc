const initialData = {
  test: "1234",
  data: [
    {
      id: 1,
      // url: "https://picsum.photos/id/1/200/300",
      url: "https://i.ibb.co/2gb0zbx/Microsoft-Teams-image.jpg",
      width: 2047,
      height: 1394,
      fields: [
        {
          co_id: 1234,
          value: "Chiranjit Sen",
          name: "Name",
          coordinates: {
            co_id: 1234,
            x: 608,
            y: 377,
            width: 496,
            height: 121,
          },
        },
        {
          co_id: 1331,
          value: "Anil Sen",
          name: "Fathers Name",
          coordinates: {
            co_id: 1331,
            x: 608,
            y: 536,
            width: 811,
            height: 134,
          },
        },
      ],
    },
    {
      id: 2,
      // url: "https://picsum.photos/id/2/200/300",
      url: "https://i.postimg.cc/3Rm46VRn/voter.jpg",
      width: 236,
      height: 314,
      fields: [
        {
          co_id: 1444,
          value: "IDOCUSENSE",
          name: "jo bhi hai",
          coordinates: {
            x: 55,
            y: 91,
            width: 66,
            height: 22,
            id: 1444,
          },
        },
        {
          co_id: 1290,
          value: "123456789012",
          name: "Voter id",
          coordinates: {
            x: 72,
            y: 188,
            width: 33,
            height: 28,
            id: 1290,
          },
        },
      ],
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
