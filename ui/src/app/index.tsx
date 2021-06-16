import { AClass } from "data-domain";
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
  <div>{JSON.stringify(new AClass("test"))}</div>,
  document.getElementById("root")
);
