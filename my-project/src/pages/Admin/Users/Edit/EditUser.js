import { Button, Form, Input, Radio, Select } from "antd";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../App";
import {
  capNhatNguoiDungAction,
  themNguoiDungAction,
} from "../../../../redux/actions/QuanLyUserActions";
import { quanLyNguoiDungService } from "../../../../services/QuanLyNguoiDungService";
import { GROUPID } from "../../../../util/settings/config";
const EditUser = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [state, setState] = useState({
    dsLoaiNguoiDung: [],
  });
  const { arrUser } = useSelector((state) => state.QuanLyUserReducer);

  const { tk } = props.match.params;
  console.log("Tk", tk);

  let getUserEdit = _.find(arrUser, function (obj) {
    if (obj.taiKhoan === tk) {
      return true;
    }
  });

  console.log("User can edit", getUserEdit);
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: getUserEdit.taiKhoan,
      matKhau: getUserEdit.matKhau,
      email: getUserEdit.email,
      soDt: getUserEdit.soDt,
      maNhom: getUserEdit.maNhom,
      maLoaiNguoiDung: getUserEdit.maLoaiNguoiDung,
      hoTen: getUserEdit.hoTen,
    },
    onSubmit: async (values) => {
      console.log("values", values);
      values.maNhom = GROUPID;

      if (
        values.taiKhoan === "" ||
        values.matKhau === "" ||
        values.email === "" ||
        values.hoTen === "" ||
        values.maLoaiNguoiDung === "" ||
        values.soDt === ""
      ) {
        alert("Phải nhập đủ thông tin người dùng trước khi thêm !");
        return;
      }
      dispatch(capNhatNguoiDungAction(values));
    },
  });
  console.log(state.dsLoaiNguoiDung);
  async function fetchData() {
    try {
      let result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
      setState({
        ...state,
        dsLoaiNguoiDung: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const convertSelectDSLoaiNguoiDung = () => {
    // state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap }))
    return state.dsLoaiNguoiDung?.map((htr, index) => {
      return { label: htr.tenLoai, value: htr.maLoaiNguoiDung };
    });
  };
  const handleChangeLoaiNguoiDung = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Cập nhật người dùng </h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
            disabled
          />
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>
        <Form.Item label="Mật khẩu" hidden={true}>
          <Input
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            htmlType="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            htmlType="tel"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Select
            options={convertSelectDSLoaiNguoiDung()}
            onChange={handleChangeLoaiNguoiDung}
            placeholder="Chọn loại người dùng"
            value={formik.values.maLoaiNguoiDung}
          />
        </Form.Item>
        <Form.Item label="Chức năng">
          <button type="submit" className="bg-blue-600 text-white p-1 mr-2">
            Cập nhật
          </button>
          <Button
            onClick={() => {
              history.goBack();
            }}
            danger
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUser;
