import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeActions";
import { DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import { UserOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import _ from "lodash";
import "./Checkout.css";
import style from "./Checkout.module.css";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
export default function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  const dispatch = useDispatch();
  console.log("danhSachGheDangDat", danhSachGheDangDat);
  useEffect(() => {
    //Gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    //Dispatch function này đi
    dispatch(action);
  }, []);

  console.log({ chiTietPhongVe });
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      if (indexGheDD != -1) {
        classGheDaDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`}
            key={index}
          >
            {ghe.daDat ? (
              classGheDaDuocDat != "" ? (
                <UserOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : (
              ghe.stt
            )}
          </button>

          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className=" min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black "
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black">Màn hình</h3>
            </div>
            <div>{renderSeats()}</div>
          </div>

          <div className="mt-5 flex justify-center">
            <table className=" divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế mình đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="ghe text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-4xl">
            {" "}
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ
          </h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p>
            Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p>
            Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Ghế</span>

              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <span key={index} className="text-green-500 text-xl">
                    {" "}
                    {gheDD.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i> <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i> <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div
            className="mb-0 h-full flex flex-col items-center"
            style={{ marginBottom: 0 }}
          >
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;

                console.log(thongTinDatVe);

                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
