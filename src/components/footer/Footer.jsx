import React from "react";
import "./Footer.scss";

const date = new Date();
const Footer = () => {
  return <div className="footer">&copy; {date.getFullYear()} All Rights Reserved</div>;
};

export default Footer;
