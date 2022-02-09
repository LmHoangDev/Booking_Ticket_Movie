import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";
export class QuanLyUserService extends baseService {
  constructor() {
    super();
  }

  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa !== "") {
      return this.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
      );
    }
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  };
}

export const quanLyUserService = new QuanLyUserService();
