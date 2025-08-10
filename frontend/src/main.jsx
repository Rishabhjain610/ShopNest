import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext  from "./contextapi/AuthContext.jsx";
import UserContext from "./contextapi/UserContext.jsx";
import ShopContext from "./contextapi/ShopContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <UserContext>
          <ShopContext>
            <App />
          </ShopContext>
        </UserContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
);
