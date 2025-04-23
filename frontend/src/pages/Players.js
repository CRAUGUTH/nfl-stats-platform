import React, { useState } from 'react';
import WeeklyStats from '../components/Players/WeeklyStats';
import YearlyStats from '../components/Players/YearlyStats';

export default function Players() {
  const [view, setView] = useState('weekly');
  return (
    <>
      <h2 className="page-title">Player Statistics</h2>
      <div className="btn-group mb-3" role="group">
        <button onClick={() => setView('weekly')} className={`btn ${view === 'weekly' ? 'btn-success' : 'btn-outline-success'}`}>Weekly</button>
        <button onClick={() => setView('yearly')} className={`btn ${view === 'yearly' ? 'btn-success' : 'btn-outline-success'}`}>Yearly</button>
      </div>
      <div className="card p-3 shadow-sm">
        {view === 'weekly' ? <WeeklyStats /> : <YearlyStats />}
      </div>
    </>
  );
}
