//import buagrouplogo-web-min from '../assets/buagroup-web-min.webp'
import { useEffect, useState } from "react";
import logoPath from "../assets/buagrouplogo.webp";
import Creatable from "react-select/creatable";
import { render } from "react-dom";

import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

import Nav from "../components/nav";
import { Link, Outlet, redirect, useNavigate } from "react-router-dom";

export default function Root() {
  // useEffect(() => {
  //   redirect("/inventory");
  // }, []);
  return (
    <div className="w-screen">
      <Nav />
      <div className="w-[100%]">
        <Outlet />
      </div>
    </div>
  );
}
