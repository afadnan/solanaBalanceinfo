import React from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import BalanceChecker from "./components/BalanceChecker";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures the container takes at least the full viewport height
      }}
    >
      <div
        style={{
          flex: "1", // Allows the content to grow and push the footer down
        }}
      >
        <AnimatedBackground />
        <BalanceChecker />
      </div>
      <Footer />
    </div>
  );
};

export default App;
