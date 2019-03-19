import React from "react";
import styles from "./footer.module.css";

const Footer = ({ bgColor }) => {
  return (
    <footer
      className={styles.wrapper}
      style={{
        backgroundColor: bgColor
      }}
    >
      <a
        href="https://github.com/KhodorAmmar/color-convert"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        github
      </a>
      <a
        href="https://khodor.dev"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        contact
      </a>
    </footer>
  );
};

export default Footer;
