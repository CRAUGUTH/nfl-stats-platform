// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Home     from './pages/Home';
import Teams    from './pages/Teams';
import Players  from './pages/Players';
import About  from './pages/About';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand">NFL Stats</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink end to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className="nav-link">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/players" className="nav-link">Players</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">About Us</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Routes>
          <Route path="/"        element={<Home />}    />
          <Route path="/teams"   element={<Teams />}   />
          <Route path="/players" element={<Players />} />
          <Route path="/about"   element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
