import React from "react";
import "./Loader.scss";
import loaderImg from "../../assets/loader.gif";
import ReactDom from "react-dom";

const Loader = () => {
  return ReactDom.createPortal(
    <div className="wrapper">
      <div className="loader">
      <svg class="spinner" viewBox="0 0 50 50">
  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
</svg>
      </div>
    </div>,document.getElementById("loader")
  );
};

export default Loader;
