import React from "react";
import "./styles.css";

import pokeball from "../../assets/pokeball.svg";

const Loading: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="loading-item">
        <h2>Loading...</h2>
        <img
          className="loader"
          src={pokeball}
          alt="Loading"
          style={{ animation: "spin 2s infinite linear" }}
        />
      </div>
    </div>
  );
};

export default Loading;
