import Home from "./components/Home";
import Forward from "./components/Forward";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  console.log("app")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:link" element={<Forward/>}/>
      </Routes>
    </Router>
  );
}

export default App;
