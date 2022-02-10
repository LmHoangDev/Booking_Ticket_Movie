import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    // {taiKhoan:'',matKhau:''}
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  dangKy = (thongTinDangKy) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };
  //lich su dat ve || show profile
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
