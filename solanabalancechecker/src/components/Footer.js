import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        padding: "1rem",
        textAlign: "center",
        color: "#999",
        borderTop: "1px solid #ddd",
        textDecoration: "none",
      }}
    >
      <p style={{ margin: "0" }}>
        Designed by{" "}
        <a
          style={{ textDecoration: "none", color: "#999" }}
          href="https://x.com/Adna_n16"
          target="_blank"
        >
          Adnan Ashraf
        </a>
      </p>
    </footer>
  );
};

export default Footer;
