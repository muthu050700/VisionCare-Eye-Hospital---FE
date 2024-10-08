import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DoctorContext from "./Components/Context/Context.jsx";
createRoot(document.getElementById("root")).render(
  <DoctorContext>
    {" "}
    <App />
  </DoctorContext>
);
