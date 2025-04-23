// src/pages/Teams.js
import React, { useState } from 'react';
import WeeklyStats from '../components/Teams/WeeklyStats';
import YearlyStats from '../components/Teams/YearlyStats';

const conferences     = ['AFC', 'NFC'];
const divisions       = ['East', 'West', 'North', 'South'];
const weeklyTeamStats = [
  'total_yards','passing_yards','rushing_yards','points_scored',
  'touchdowns','fumble','fumble_lost','field_goal_attempt','fg_points'
];
const yearlyTeamStats = [
  'total_yards','total_tds','passing_yards','passing_tds',
  'rushing_yards','rushing_tds','record','fumble','fumble_lost',
  'field_goal_attempt','fg_points','win_pct'
];

export default function Teams() {
  const [view,       setView      ] = useState('weekly');
  const [searchName, setSearchName] = useState('');
  const [conference, setConference] = useState('');
  const [division,   setDivision]   = useState('');
  const [stat,       setStat]       = useState('');
  const [sortOrder,  setSortOrder]  = useState('asc');

  const statsOptions = view === 'weekly' ? weeklyTeamStats : yearlyTeamStats;

  return (
    <>
      <h2 className="page-title">Team Statistics</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search team name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={conference} onChange={e => setConference(e.target.value)}>
            <option value="">All Conferences</option>
            {conferences.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={division} onChange={e => setDivision(e.target.value)}>
            <option value="">All Divisions</option>
            {divisions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={stat} onChange={e => setStat(e.target.value)}>
            <option value="">All Stats</option>
            {statsOptions.map(s =>
              <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
            )}
          </select>
        </div>
        <div className="col-md-1">
          <select className="form-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={() => {/* fetch with filters */}}>
            Apply
          </button>
        </div>
      </div>

      <div className="btn-group mb-3" role="group">
        <button
          className={`btn ${view==='weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setView('weekly')}>
          Weekly
        </button>
        <button
          className={`btn ${view==='yearly' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setView('yearly')}>
          Yearly
        </button>
      </div>

      <div className="card p-3 shadow-sm">
        {view === 'weekly'
          ? <WeeklyStats filters={{ searchName, conference, division, stat, sortOrder }} />
          : <YearlyStats  filters={{ searchName, conference, division, stat, sortOrder }} />
        }
      </div>
    </>
  );
}
