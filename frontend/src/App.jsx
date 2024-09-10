import { useState } from "react";
import { BrowserRouter } from 'react-router-dom';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

