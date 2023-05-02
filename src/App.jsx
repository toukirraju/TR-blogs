import "./style/main.css";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <!-- navbar  --> */}
      <Navbar />

      {/* <!-- main --> */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blog/:blogid" element={<Blog />} />
      </Routes>

      {/* <Home /> */}
    </div>
  );
}

export default App;
