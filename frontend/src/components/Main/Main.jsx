import { Route, Routes, Navigate } from 'react-router-dom';

import FAQ from "../../pages/FAQ/FAQ";
import Home from "../../pages/Home/Home";

export default function Main() {
  return (
    <main className="main">
      <div className="main__container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/FAQ" element={<FAQ />} />
        </Routes>
      </div>
    </main>
  );
}
