import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./Component/ForgotPassword";
import Resetpassword from "./Component/Resetpassword";
import Register from "./Component/Register";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/resetpassword" element={<Resetpassword />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
