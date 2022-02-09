import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      //Sử dụng tham số thamSo
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: HIDE_LOADING,
      });
      //Sau khi lấy dữ liệu từ api về => redux (reducer)
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      dispatch({
        type: HIDE_LOADING,
      });
      console.log("errors", errors);
    }
  };
};
export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("Thêm phim thành công!");
      console.log("result", result.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert("Cập nhật phim thành công!");
      console.log("result", result.data.content);

      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      //Sử dụng tham số thamSo
      const result = await quanLyPhimService.xoaPhim(maPhim);
      alert("Xóa phim thành công");
      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      //Sử dụng tham số thamSo
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
