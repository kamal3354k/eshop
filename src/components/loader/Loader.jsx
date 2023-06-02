import React from "react";
import "./Loader.scss";
import loaderImg from "../../assets/loader.gif";
import ReactDom from "react-dom";

const Loader = () => {
  return ReactDom.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,document.getElementById("loader")
  );
};

export default Loader;
