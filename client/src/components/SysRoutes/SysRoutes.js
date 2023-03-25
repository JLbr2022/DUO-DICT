// Create routes for the app and import the components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAllWords from "../DisplayAllWords/DisplayAllWords";
import Sentences from "../Sentences/Sentences";

function SysRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={""} />
        <Route path="/DisplayAllWords" element={<DisplayAllWords />} />
        <Route path="/Sentences" element={<Sentences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SysRoutes;
