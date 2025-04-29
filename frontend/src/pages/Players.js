// src/pages/Players.js
import React, { useState } from 'react';
import WeeklyStats from '../components/Players/WeeklyStats';
import YearlyStats from '../components/Players/YearlyStats';

const positions        = ['QB','WR','RB','TE'];
const allWeeklyStatsP  = [
  'pass_attempts','complete_pass','comp_pct','passing_yards','pass_tds',
  'interceptions','passer_rating','receptions','receiving_yards',
  'reception_tds','ypr','rush_attempts','rushing_yards','rush_tds',
  'ypc','total_tds','total_yards'
];
const allYearlyStatsP  = [
  ...allWeeklyStatsP, 'pass_ypg','rec_ypg','rush_ypg','ypg'
];

export default function Players() {
  const [view,       setView       ] = useState('weekly');
  const [searchName, setSearchName ] = useState('');
  const [position,   setPosition   ] = useState('');
  const [stat,       setStat       ] = useState('');
  const [sortOrder,  setSortOrder  ] = useState('asc');
  const [results,    setResults    ] = useState([]);

  const statsOptions = view==='weekly' ? allWeeklyStatsP : allYearlyStatsP;

  const fetchPlayers = async () => {
    const params = new URLSearchParams({
      view, searchName, position, stat, sortOrder
    }).toString();
    const res = await fetch(`/api/players?${params}`);
    const json = await res.json();
    setResults(json);
  };

  return (
    <>
      <h2 className="page-title">Player Statistics</h2>

      <div className="row g-3 mb-4 align-items-center">
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search player name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={position}
            onChange={e => setPosition(e.target.value)}
          >
            <option value="">All Positions</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={stat}
            onChange={e => setStat(e.target.value)}
            style={{ maxHeight: 200, overflowY: 'auto' }}
          >
            <option value="">All Stats</option>
            {statsOptions.map(s => (
              <option key={s} value={s}>{s.replace(/_/g,' ')}</option>
            ))}
          </select>
        </div>

        <div className="col-md-1">
          <select
            className="form-select"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={fetchPlayers}>
            Apply
          </button>
        </div>
      </div>

      <div className="btn-group mb-3">
        <button
          className={`btn ${view==='weekly'?'btn-success':'btn-outline-success'}`}
          onClick={() => setView('weekly')}
        >
          Weekly
        </button>
        <button
          className={`btn ${view==='yearly'?'btn-success':'btn-outline-success'}`}
          onClick={() => setView('yearly')}
        >
          Yearly
        </button>
      </div>

      <div className="card p-3 shadow-sm">
        {view==='weekly'
          ? <WeeklyStats data={results} />
          : <YearlyStats data={results} />
        }
      </div>
    </>
  );
}
