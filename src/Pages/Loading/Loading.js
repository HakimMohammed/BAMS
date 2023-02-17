import React from "react";

import "./Loading.css";

const Loading = () => {
  const loader = document.querySelector('loader');
  window.addEventListener('load', () => {
    loader.classList.add('foundu-out');
  })
  let imgsrc = require("./Logo.png");

  return (
    <div className="loadingPage">
      <div className="loader">

        <img className="LoadingImg" src={imgsrc} alt="" />
        <div className="load"></div>


        <span className="lettre">B</span>
        <span className="lettre">a</span>
        <span className="lettre">m</span>
        <span className="lettre">s</span>
      </div>
    </div>
  );
};

export default Loading;
