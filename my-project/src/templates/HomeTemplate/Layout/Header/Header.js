import { Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";
const { Option } = Select;
export default function Header() {
  const { t, i18n } = useTranslation();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            {t("Sign in")}
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50"
          >
            {t("Sign up")}
          </button>
          <Select
            defaultValue="en"
            style={{ width: 80, marginLeft: 20 }}
            onChange={handleChange}
            className="ml-1"
          >
            <Option value="en">Eng</Option>
            <Option value="chi">Chi</Option>

            <Option value="vi">Vi</Option>
          </Select>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/profile");
            }}
            className="self-center py-2 px-3 rounded-full font-semibold bg-violet-600 text-coolGray-50"
          >
            <UserOutlined />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              window.location.reload();
            }}
            className="self-center px-3 ml-2 py-1 font-semibold rounded bg-red-600 text-coolGray-50"
          >
            Log out
          </button>
        </Fragment>
      );
    }
  };
  return (
    <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="cyberlearn.vn"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent  text-white"
              activeClassName="border-b-2 border-white"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              News
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-coolGray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
