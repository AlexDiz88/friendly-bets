import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import UserRegistration from '../UserRegistration/UserRegistration';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<UserRegistration />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
