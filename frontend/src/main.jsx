import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextprovider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthContextprovider>
    <BrowserRouter>
      <StrictMode>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </StrictMode>
    </BrowserRouter>
  </AuthContextprovider>
);
