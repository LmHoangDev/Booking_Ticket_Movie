import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  LayDanhSachNguoiDungAction,
  xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyUserActions";
import { Input, Space } from "antd";
import { history } from "../../../App";

const { Search } = Input;
export default function Users() {
  const { arrUser } = useSelector((state) => state.QuanLyUserReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LayDanhSachNguoiDungAction());
  }, []);
  console.log("arrUser", arrUser);
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",

      width: "15%",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: "15%",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",

      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",

      width: "15%",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",

      width: "20%",
      sorter: (a, b) => {
        let maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim();
        let maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              className=" mr-2  text-2xl"
              key="1"
              to={`/admin/users/edituser/${user.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              className="text-2xl"
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc muốn xoá tài khoản " + user.taiKhoan
                  )
                ) {
                  if (user.maLoaiNguoiDung === "QuanTri") {
                    alert("Bạn không có quyền xóa !");
                    return;
                  }
                  //Gọi action
                  dispatch(xoaNguoiDungAction(user.taiKhoan));
                }
              }}
              key="2"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
      width: "20%",
    },
  ];

  const data = arrUser;
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const onSearch = (value) => {
    dispatch(LayDanhSachNguoiDungAction(value));
  };
  return (
    <Fragment>
      <h3 className="text-3xl">Quản lý người dùng</h3>
      <Button
        className="mb-5"
        type="primary"
        onClick={() => {
          history.push("/admin/users/addnew");
        }}
      >
        Thêm người dùng
      </Button>
      <Search
        className="mb-5"
        placeholder="Tìm kiếm theo người dùng"
        enterButton={<SearchOutlined />}
        size="middle"
        onSearch={onSearch}
        style={{ width: 300, float: "right" }}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </Fragment>
  );
}
