// src/pages/About.js
import React from 'react';

// ← import the JPGs from src/images
import connerPic from '../images/conner.jpg';
import trentPic  from '../images/trent.jpg';

export default function AboutUs() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">About Us</h2>
      <div className="row g-4">
        {/* Your profile */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 text-center">
            <img
              src={connerPic}                 // ← use the imported variable
              alt="Conner Rauguth"
              className="rounded-circle mx-auto mt-4"
              style={{ width: 175, height: 200, objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Conner Rauguth</h5>
              <p className="card-text">
                Senior Computer Science at University of Notre Dame
              </p>
            </div>
          </div>
        </div>
        {/* Teammate profile */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 text-center">
            <img
              src={trentPic}                  // ← use the imported variable
              alt="Trent Delp"
              className="rounded-circle mx-auto mt-4"
              style={{ width: 175, height: 200, objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Trent Delp</h5>
              <p className="card-text">
                Senior Computer Science at University of Notre Dame
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
