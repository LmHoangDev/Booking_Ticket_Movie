import React, { useEffect, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";

import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  console.log("propsHome", props);
  console.log("he thong rap", heThongRapChieu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction()); //dispatch function từ thunk
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  return (
    <div>
      <HomeCarousel />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>

      <div className="mx-36">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
