// src/pages/Home.js
import React from 'react';

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <div className="bg-primary text-white text-center py-5 mb-5">
        <div className="container">
          <h1 className="display-4">NFL Stats Platform</h1>
          <p className="lead">
            Explore, compare, and analyze NFL team &amp; player stats (2012–2023) with interactive filters and charts.
          </p>
        </div>
      </div>

      {/* Features cards */}
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Advanced Filtering</h5>
                <p className="card-text">
                  Drill down by team, player, position, conference, division, or stat—weekly or yearly.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Head-to-Head Compare</h5>
                <p className="card-text">
                  Select any two teams or players and see their performance plotted side-by-side.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Dynamic Visualizations</h5>
                <p className="card-text">
                  Built-in charts let you spot trends, career arcs, and seasonal highlights at a glance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
