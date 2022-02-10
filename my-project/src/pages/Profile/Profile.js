import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { Tabs, Radio, Space, Form, Input, Button, Modal } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { useFormik } from "formik";
import { capNhatTaiKhoanAction } from "../../redux/actions/QuanLyUserActions";
import _ from "lodash";
import moment from "moment";
const { TabPane } = Tabs;
export default function Profile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkPassWord, setCheckPassWord] = useState("");
  const [rePassWord, setRePassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
    setRePassWord("");
    setNewPassWord("");
  };

  const handleOk = () => {
    if (thongTinNguoiDung?.matKhau === rePassWord) {
      formik.setFieldValue("matKhau", newPassWord);
      setIsModalVisible(false);
      formik.handleSubmit();
      setRePassWord("");
      setCheckPassWord("");
      // setNewPassWord("");
    } else {
      setCheckPassWord("Mật khẩu không đúng");
      setNewPassWord("");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRePassWord("");
    setCheckPassWord("");
    setNewPassWord("");
  };
  const [state, setState] = useState({
    tabPosition: "top",
  });
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  // console.log("userLogin", userLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);
  const operations = (
    <Fragment>
      <div className="flex">
        <div
          style={{
            width: 50,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="text-2xl ml-5 rounded-full bg-red-200"
        >
          <UserOutlined />
        </div>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/home");
            window.location.reload();
          }}
          className="self-center px-3 ml-2 py-1 font-semibold rounded bg-red-600 text-white"
        >
          Log out
        </button>
      </div>
    </Fragment>
  );

  const [requiredMark, setRequiredMarkType] = useState("");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userLogin.taiKhoan,
      email: userLogin.email,
      soDt: userLogin.soDT,
      maNhom: userLogin.maNhom,
      maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
      hoTen: userLogin.hoTen,
      matKhau: thongTinNguoiDung.matKhau,
    },
    onSubmit: async (values) => {
      console.log("values", values);
      let thongTinCapNhat = {
        taiKhoan: values.taiKhoan,
        email: values.email,
        soDt: values.soDt,
        maNhom: userLogin.maNhom,
        maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
        hoTen: values.hoTen,
        matKhau: values.matKhau,
      };
      console.log("Thong Tin Cap Nhat", thongTinCapNhat);
      await dispatch(capNhatTaiKhoanAction(thongTinCapNhat));
    },
  });
  const renderInfoUser = () => {
    return (
      <Form
        onSubmitCapture={formik.handleSubmit}
        layout="vertical"
        // initialValues={{
        //   requiredMarkValue: requiredMark,
        // }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        className="w-96"
        style={{ margin: "0 auto" }}
      >
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
        <Form.Item label="Mật khẩu">
          <Input.Password
            name="matKhau"
            htmlType="password"
            value={thongTinNguoiDung.matKhau}
            disabled
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Input
            name="maLoaiNguoiDung"
            onChange={formik.handleChange}
            value={formik.values.maLoaiNguoiDung}
            disabled
          />
        </Form.Item>
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
          <Button type="primary" danger className="ml-2" onClick={showModal}>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const handleRePassWord = (e) => {
    setRePassWord(e.target.value);
  };
  const handleNewPassWord = (e) => {
    setNewPassWord(e.target.value);
  };
  console.log("Thong Tin Nguoi Dung", thongTinNguoiDung);
  const renderInfoDatVe = () => {
    return (
      <Fragment>
        {_.isEmpty(thongTinNguoiDung)
          ? ""
          : thongTinNguoiDung.thongTinDatVe.map((film, index) => {
              return (
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg"
                  key={index}
                  style={{ width: "300" }}
                >
                  <img
                    src={film.hinhAnh}
                    alt="Sunset in the mountains"
                    class="w-full h-56"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xs text-ellipsis whitespace-nowrap overflow-hidden mb-2">
                      Tên phim: {film.tenPhim}
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-red-600">
                        {moment(film.ngayDat).format("DD/MM/YYYY, h:mm:ss a")}
                      </span>
                      <span className="text-red-600">
                        Giá vé: {film.giaVe.toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-2">
                      <span className="text-red-600 font-bold">Số ghế:</span>
                      {film.danhSachGhe.map((ghe, index) => {
                        return (
                          <p className="text-right">
                            {ghe.tenGhe} - {ghe.tenHeThongRap} tại {ghe.tenRap}
                          </p>
                        );
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
      </Fragment>
    );
  };
  return (
    <div className="mt-8 container px-7 text-2xl">
      <Tabs
        tabPosition={state.tabPosition}
        tabBarExtraContent={operations}
        className="text-4xl"
      >
        <TabPane tab="Thông tin tài khoản" key="1">
          {renderInfoUser()}
        </TabPane>
        <TabPane tab="Lịch sử đặt vé" key="2">
          <div className="grid grid-cols-4 gap-3 mt-2">{renderInfoDatVe()}</div>
        </TabPane>
        <TabPane
          tab={
            <Fragment>
              <span
                onClick={() => {
                  history.push("/home");
                }}
              >
                <HomeOutlined />
              </span>
            </Fragment>
          }
          key="3"
        >
          Content of Tab 2
        </TabPane>
      </Tabs>
      <Modal
        title={<span className="text-red-600 text-center">Đổi mật khẩu</span>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onSubmitCapture={formik.handleSubmit}
          layout="vertical"
          // initialValues={{
          //   requiredMarkValue: requiredMark,
          // }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          style={{ margin: "0 auto" }}
        >
          <Form.Item label="Mật khẩu">
            <Input.Password
              name="matKhau"
              htmlType="password"
              value={thongTinNguoiDung.matKhau}
              disabled
            />
          </Form.Item>
          <Form.Item label="Nhập lại mật khẩu">
            <Input.Password
              name="reMatKhau"
              value={rePassWord}
              onChange={handleRePassWord}
            />
          </Form.Item>

          <p className="text-red-600 text-center">{checkPassWord}</p>
          <Form.Item label="Nhập mật khẩu mới">
            <Input.Password
              name="newMatKhau"
              value={newPassWord}
              onChange={handleNewPassWord}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
