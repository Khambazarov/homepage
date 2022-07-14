import React from "react";
import { ButtonMUI } from "../materialUI/ButtonMUI";

export const Home = () => {
  return (
    <div className="Home">
      <div className="container">
        <h2>
          Hello, I'm <span className="intro_name">Renat Khambazarov</span>.
        </h2>
        <h2>I'm a web & software developer.</h2>
        <ButtonMUI />
      </div>
    </div>
  );
};
