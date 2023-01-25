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
          name: 10,
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
          name: 20,
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
          name: 20,
          coordinates: {
            x: 55,
            y: 91,
            width: 66,
            height: 22,
            co_id: 1444,
          },
        },
        {
          co_id: 1290,
          value: "123456789012",
          name: 20,
          coordinates: {
            x: 72,
            y: 188,
            width: 33,
            height: 28,
            co_id: 1290,
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

    case "ADD_COORDINATES":
      const values = action.payload;
      console.log("bro I am here", values.data);
      const coordObj = {
        height: values.data.height / values.data.heightRatio,
        width: values.data.width / values.data.widthRatio,
        x: values.data.x / values.data.widthRatio,
        y: values.data.y / values.data.heightRatio,
        co_id: values.co_id,
      };
      const fieldData = {
        co_id: values.co_id,
        name: values.data.keyName,
        value: values.data.text,
        coordinates: coordObj,
      };
      console.log("filedData", fieldData);

      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === values.imageId) {
          state.data[i].fields.push(fieldData);
          return state;
        }
      }
      break;

    case "EDIT_COORDINATE":
      const editValues = action.payload;
      console.log("edit reducer", editValues);
      const coordObjEdit = {
        height: editValues.data.height / editValues.data.heightRatio,
        width: editValues.data.width / editValues.data.widthRatio,
        x: editValues.data.x / editValues.data.widthRatio,
        y: editValues.data.y / editValues.data.heightRatio,
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
          return state;
        }
      });

      return state;
      // for (let i = 0; i < state.data.length; i++) {
      //   if (state.data[i].id === editValues.imageId) {
      //     for (let y = 0; y < state.data[i].fields.length; y++) {
      //       console.log("hello edit", state.data[i], state.data[i].fields[y]);
      //       if (state.data[i].fields[y].co_id === editValues.data.co_id) {
      //         const filteredData = state.data[i].fields.filter(
      //           (item) => item.co_id === editValues.data.co_id
      //         );
      //         console.log(filteredData);
      //         const modifiedData = [filteredData, fieldDataEdit];
      //         // state.data[i].fields.push(fieldDataEdit);
      //       }
      //     }
      //     // return state;
      //   }
      // }

      break;

    default:
      return state;
  }
};

export default ManualReviewReducers;
