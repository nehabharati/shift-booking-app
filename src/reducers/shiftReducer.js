import { GET_SHIFTS, SHIFTS_LOADING } from "../actions/types";

const initialState = {
  shifts: [],
};
{
  // console.log(initialState);
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHIFTS:
      {
        console.log(action.payload);
      }
      return {
        ...state,
        shifts: action.payload,
      };
    // case DELETE_ITEM:
    //   return {
    //     ...state,
    //     items: state.items.filter((item) => item._id !== action.payload),
    //   };
    // case ADD_ITEM:
    //   return {
    //     ...state,
    //     items: [action.payload, ...state.items],
    //   };
    // case ITEMS_LOADING:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    default:
      return state;
  }
}
