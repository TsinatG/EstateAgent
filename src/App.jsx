import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import './styles/global.css';
import './styles/App.css';

const App = () => {
  return (
        <div className="app-container">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/property/:id" element={<PropertyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
  );
};

export default App;
