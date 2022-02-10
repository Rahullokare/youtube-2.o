import React from "react";

import "./Base.css";
import Menu from "./Menu";

function Base({ children, className = "container" }) {
  return (
    <div>
      <Menu />
      <div className={className}>{children}</div>
    </div>
  );
}

export default Base;
