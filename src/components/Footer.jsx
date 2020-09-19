import React from "react";

const Footer = () => (
  <footer className="footer">
    <span>
      <a href="https://github.com/flowck/react-uuid-generator">
        React UUID generator
      </a>{" "}
      - {new Date().getFullYear()}
    </span>
    <span>
      Built by <a href="https://github.com/flowck">Firmino Changani</a>
    </span>
  </footer>
);

export default Footer;
