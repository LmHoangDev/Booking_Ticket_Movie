import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { Button } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { GROUPID } from "../../util/settings/config";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { history } from "../../App";
import { LayDanhSachNguoiDungAction } from "../../redux/actions/QuanLyUserActions";
import { useDispatch } from "react-redux";
const schema = yup
  .object({
    taiKhoan: yup.string().required("TaiKhoan is required"),
    soDt: yup
      .string()
      .matches(/^([0-9]){9,11}$/, "SoDT is not valid")
      .min(9)
      .max(11)
      .required("SoDT is required"),
    hoTen: yup.string().required(),
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    matKhau: yup.string().min(6).max(12).required("Password is required"),
    maNhom: yup.string().required().default(GROUPID),
  })
  .required();
export default function Register() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
    },
  });
  console.log("Register", register);
  const onSubmit = async (data) => {
    console.log("values", data);
    try {
      const result = await quanLyNguoiDungService.dangKy(data);
      if (result.status === 200) {
        alert(
          "Đăng ký tài khoản thành công ! Hãy quay lại trang chủ để đăng nhập !"
        );
        history.push("/home");
        dispatch(LayDanhSachNguoiDungAction());
      }
    } catch (error) {
      console.log("error", error.response?.data);
      alert(error.response?.data.content);
    }
  };

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-5 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              style={{ enableBackground: "new 0 0 225 225" }}
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            Tix Movie
          </div>
        </div>
      </div>
      <div className="mt-2 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-10 xl:px-16 xl:max-w-2xl">
        <h2
          className="text-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl
      xl:text-bold"
        >
          Đăng ký
        </h2>
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="taiKhoan"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Tài khoản"
                  type="text"
                  {...register("taiKhoan")}
                />
              )}
            />
            <p className="text-red-600">{errors.taiKhoan?.message}</p>
            <Controller
              name="hoTen"
              control={control}
              render={({ field }) => (
                <TextField label="Họ Tên" type="text" {...register("hoTen")} />
              )}
            />
            <p className="text-red-600">{errors.hoTen?.message}</p>

            <Controller
              name="matKhau"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Mật khẩu"
                  type="password"
                  autoComplete="current-password"
                  {...register("matKhau")}
                />
              )}
            />
            <p className="text-red-600">{errors.matKhau?.message}</p>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  type="email"
                  autoComplete="current-password"
                  {...register("email")}
                />
              )}
            />
            <p className="text-red-600">{errors.email?.message}</p>
            <Controller
              name="soDt"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Số điện thoại"
                  type="text"
                  autoComplete="current-password"
                  {...register("soDt")}
                />
              )}
            />
            <p className="text-red-600">{errors.soDt?.message}</p>
            <input type="hidden" {...register("maNhom")} />
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
