import React from "react";
import { BsHouseDoorFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="contact-container">
        <BsFillTelephoneFill className="contact-icon" />
        <span className="span-text color-text">(03489) - 407000</span>
      </div>
      <div className="contact-container">
        <a href="mailto:verificaciones@campana.gov.ar">
          <MdEmail className="contact-icon" />
          <span className="span-text color-text">
            verificaciones@campana.gov.ar
          </span>
        </a>
      </div>
      <div className="contact-container">
        <BsHouseDoorFill className="contact-icon" />
        <span className="span-text color-text">Av. Varela 371</span>
      </div>
    </div>
  );
};

export default Footer;
