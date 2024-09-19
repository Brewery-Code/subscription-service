import { Route, Routes, Navigate } from 'react-router-dom';

import FAQ from "../../pages/FAQ/FAQ";
import Home from "../../pages/Home/Home";
import Subscription from '../../pages/Subscription/Subscription';

export default function Main({ state }) {
  return (
    <main className="main">
      <div className="main__container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home state={state} />} />
          <Route path="/FAQ" element={<FAQ faq={state.faq} />} />
          <Route path='/subscription' element={<Subscription subscription={state.subscription} subscriptionPlan={state.subscriptionPlan} faq={state.faq} />} />
        </Routes>
      </div>
    </main>
  );
}
