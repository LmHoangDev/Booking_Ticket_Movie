import { SET_CAROUSEL } from "../actions/types/CarouselType";

const initialState = {
  arrImg: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CAROUSEL: {
      state.arrImg = action.arrImg;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
