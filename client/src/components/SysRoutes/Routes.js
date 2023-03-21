// Create routes for the app and import the components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
// import Header from "./Header/Header";
// import { DisplayAllWords } from "./DisplayAllWords/DisplayAllWords";

function SysRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/all" element={<DisplayAllWords />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default SysRoutes;
