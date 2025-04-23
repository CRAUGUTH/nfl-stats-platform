// src/pages/Players.js
import React, { useState } from 'react';
import WeeklyStats from '../components/Players/WeeklyStats';
import YearlyStats from '../components/Players/YearlyStats';

const positions         = ['QB','RB','WR','TE','K','DEF'];
const conferencesP      = ['AFC','NFC'];
const divisionsP        = ['East','West','North','South'];
const weeklyPlayerStats = [
  'pass_attempts','complete_pass','comp_pct','passing_yards','pass_tds',
  'interceptions','passer_rating','receptions','receiving_yards',
  'reception_tds','ypr','rush_attempts','rushing_yards','rush_tds',
  'ypc','total_tds','total_yards'
];
const yearlyPlayerStats = [...weeklyPlayerStats,'pass_ypg','rec_ypg','rush_ypg','ypg'];

export default function Players() {
  const [view,       setView      ] = useState('weekly');
  const [searchName, setSearchName] = useState('');
  const [position,   setPosition  ] = useState('');
  const [conference, setConference] = useState('');
  const [division,   setDivision]   = useState('');
  const [stat,       setStat      ] = useState('');
  const [sortOrder,  setSortOrder ] = useState('asc');

  const statsOptions = view === 'weekly' ? weeklyPlayerStats : yearlyPlayerStats;

  return (
    <>
      <h2 className="page-title">Player Statistics</h2>

      <div className="row g-3 mb-4">
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
          <select className="form-select" value={position} onChange={e => setPosition(e.target.value)}>
            <option value="">All Positions</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={conference} onChange={e => setConference(e.target.value)}>
            <option value="">All Conferences</option>
            {conferencesP.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={division} onChange={e => setDivision(e.target.value)}>
            <option value="">All Divisions</option>
            {divisionsP.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={stat} onChange={e => setStat(e.target.value)}>
            <option value="">All Stats</option>
            {statsOptions.map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
          </select>
        </div>
        <div className="col-md-1">
          <select className="form-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100" onClick={() => {/* fetch with filters */}}>
            Apply
          </button>
        </div>
      </div>

      <div className="btn-group mb-3" role="group">
        <button className={`btn ${view==='weekly'?'btn-success':'btn-outline-success'}`} onClick={() => setView('weekly')}>Weekly</button>
        <button className={`btn ${view==='yearly'?'btn-success':'btn-outline-success'}`} onClick={() => setView('yearly')}>Yearly</button>
      </div>

      <div className="card p-3 shadow-sm">
        {view==='weekly'
          ? <WeeklyStats filters={{ searchName, position, conference, division, stat, sortOrder }} />
          : <YearlyStats  filters={{ searchName, position, conference, division, stat, sortOrder }} />
        }
      </div>
    </>
  );
}
