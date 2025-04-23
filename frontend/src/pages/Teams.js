import React, { useState } from 'react';
import WeeklyStats from '../components/Teams/WeeklyStats';
import YearlyStats from '../components/Teams/YearlyStats';

export default function Teams() {
  const [view, setView] = useState('weekly');
  return (
    <>
      <h2 className="page-title">Team Statistics</h2>
      <div className="btn-group mb-3" role="group">
        <button onClick={() => setView('weekly')} className={`btn ${view === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}>Weekly</button>
        <button onClick={() => setView('yearly')} className={`btn ${view === 'yearly' ? 'btn-primary' : 'btn-outline-primary'}`}>Yearly</button>
      </div>
      <div className="card p-3 shadow-sm">
        {view === 'weekly' ? <WeeklyStats /> : <YearlyStats />}
      </div>
    </>
  );
}
