import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

export default function App() {
  const IPList = {
    localhost: 'localhost',
    Vitalii: '192.168.1.5',
  }

  const IP = IPList.Vitalii;

  const [services, setServices] = useState(null);

  useEffect(() => {
    axios.get(`http://${IP}:8000/api/services`)
      .then(res => {
        const data = res.data;
        setServices(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const [faqList, setFaqList] = useState(null);

  useEffect(() => {
    axios.get(`http://${IP}:8000/api/faq`)
      .then(res => {
        const data = res.data;
        setFaqList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let state = {
    services: services,
    faq: faqList,
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header state={state} />
        <Main state={state} />
        <Footer state={state} />
      </div>
    </BrowserRouter>
  );
}

