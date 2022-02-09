import { GET_DANH_SACH_NGUOI_DUNG } from "../actions/types/QuanLyUserType";

const initialState = {
  arrUser: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DANH_SACH_NGUOI_DUNG: {
      state.arrUser = action.arrUser;
      return { ...state };
    }

    default:
      return state;
  }
};
