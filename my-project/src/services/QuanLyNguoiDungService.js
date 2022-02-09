import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    // {taiKhoan:'',matKhau:''}
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  //lich su dat ve
  layThongTinNguoiDung = () => {
    return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };
  layDanhSachLoaiNguoiDung = () => {
    return this.get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  };
  themNguoiDung = (thongTinNguoiDung) => {
    return this.post("/api/QuanLyNguoiDung/ThemNguoiDung", thongTinNguoiDung);
  };
  capNhatNguoiDung = (thongTinNguoiDung) => {
    return this.post(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      thongTinNguoiDung
    );
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
