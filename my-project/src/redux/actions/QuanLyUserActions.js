import { quanLyUserService } from "../../services/QuanLyUserService";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { GET_DANH_SACH_NGUOI_DUNG } from "../actions/types/QuanLyUserType";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType";
import { history } from "../../App";
import { layThongTinNguoiDungAction } from "./QuanLyNguoiDungActions";
import { USER_LOGIN } from "../../util/settings/config";
import { dangNhapAction } from "./QuanLyNguoiDungActions";
export const LayDanhSachNguoiDungAction = (tuKhoa = "") => {
  console.log("abc");
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyUserService.layDanhSachNguoiDung(tuKhoa);

      console.log("result", result.data.content);
      if (result.status === 200) {
        dispatch({
          type: GET_DANH_SACH_NGUOI_DUNG,
          arrUser: result.data.content,
        });
      }
      dispatch({
        type: HIDE_LOADING,
      });
    } catch (errors) {
      dispatch({
        type: HIDE_LOADING,
      });
      console.log("errors", errors.response?.data);
    }
  };
};
export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      //Sử dụng tham số thamSo
      const result = await quanLyUserService.xoaNguoiDung(taiKhoan);
      alert("Xóa phim thành công");
      dispatch(LayDanhSachNguoiDungAction());
    } catch (errors) {
      alert(errors.response?.data.content);
      console.log("errors", errors.response?.data.content);
    }
  };
};
export const themNguoiDungAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.themNguoiDung(
        thongTinNguoiDung
      );
      if (result.status === 200) {
        alert("Thêm mới người dùng thành công");
        dispatch(LayDanhSachNguoiDungAction());
        history.push("/admin/users");
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
export const capNhatNguoiDungAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.capNhatNguoiDung(
        thongTinNguoiDung
      );
      if (result.status === 200) {
        alert("Cập nhật người dùng thành công");
        dispatch(LayDanhSachNguoiDungAction());
        history.push("/admin/users");
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
export const capNhatTaiKhoanAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.capNhatNguoiDung(
        thongTinNguoiDung
      );
      if (result.status === 200) {
        alert("Cập nhật tài khoản thành công");

        dispatch(LayDanhSachNguoiDungAction());
        dispatch(layThongTinNguoiDungAction());
        window.location.reload();
        dispatch(
          dangNhapAction({
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
          })
        );
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
      alert(errors.response?.data.content);
    }
  };
};
