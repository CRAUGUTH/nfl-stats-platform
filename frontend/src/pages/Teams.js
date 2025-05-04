// src/pages/Teams.js
import React, { useState } from 'react';
import WeeklyStats     from '../components/Teams/WeeklyStats';
import YearlyStats     from '../components/Teams/YearlyStats';
import ComparisonChart from '../components/Common/ComparisonChart';

const conferences    = ['AFC','NFC'];
const divisions      = ['East','West','North','South'];
const allWeeklyStats = [
  'total_yards','passing_yards','rushing_yards','points_scored',
  'touchdowns','fumble','fumble_lost','field_goal_attempt','fg_points'
];
const allYearlyStats = [
  'total_yards','total_tds','passing_yards','passing_tds',
  'rushing_yards','rushing_tds','win_pct','record',
  'fumble','fumble_lost','field_goal_attempt','fg_points'
];

export default function Teams() {
  const [mode,        setMode      ] = useState('stats');    // 'stats' or 'compare'
  const [view,        setView      ] = useState('weekly');   // 'weekly' or 'yearly'
  const [searchName,  setSearchName] = useState('');
  const [conference,  setConference] = useState('');
  const [division,    setDivision  ] = useState('');
  const [stat,        setStat      ] = useState('');
  const [sortOrder,   setSortOrder ] = useState('asc');
  const [results,     setResults   ] = useState([]);
  const [searched,    setSearched  ] = useState(false);
  const [error,       setError     ] = useState('');

  // compare mode state
  const [t1,     setT1    ] = useState('');
  const [t2,     setT2    ] = useState('');
  const [cmpStat,setCmpStat] = useState('');
  const [d1,     setD1    ] = useState([]);
  const [d2,     setD2    ] = useState([]);

  const statsOptions = view === 'weekly' ? allWeeklyStats : allYearlyStats;

  const fetchTeams = async () => {
    setSearched(true);
    // if no name AND no other filter, show error
    if (!searchName.trim() && !conference && !division) {
      setError('Please enter a team name or select at least one filter.');
      setResults([]);
      return;
    }
    setError('');
    const qs = new URLSearchParams({
      view,
      searchName,
      conference,
      division,
      stat,
      sortOrder
    }).toString();
    const res = await fetch(`/api/teams?${qs}`);
    setResults(await res.json());
  };

  const resetStats = () => {
    setResults([]);
    setSearched(false);
    setError('');
  };

  const fetchCompare = async () => {
    if (!cmpStat.trim() || !t1.trim() || !t2.trim()) return;
    const mkQS = name => new URLSearchParams({
      view:       'yearly',
      searchName: name,
      stat:       cmpStat,
      sortOrder:  'asc'
    }).toString();
    const [r1, r2] = await Promise.all([
      fetch(`/api/teams?${mkQS(t1)}`),
      fetch(`/api/teams?${mkQS(t2)}`)
    ]);
    const [j1, j2] = await Promise.all([r1.json(), r2.json()]);
    setD1(j1);
    setD2(j2);
  };

  return (
    <>
      <h2 className="page-title">Team Statistics</h2>

      <div className="btn-group mb-3">
        <button
          className={`btn ${mode==='stats'&&view==='weekly'?'btn-primary':'btn-outline-primary'}`}
          onClick={()=>{setMode('stats');setView('weekly');resetStats();}}
        >Weekly</button>
        <button
          className={`btn ${mode==='stats'&&view==='yearly'?'btn-primary':'btn-outline-primary'}`}
          onClick={()=>{setMode('stats');setView('yearly');resetStats();}}
        >Yearly</button>
        <button
          className={`btn ${mode==='compare'?'btn-primary':'btn-outline-primary'}`}
          onClick={()=>{setMode('compare');resetStats();}}
        >Compare</button>
      </div>

      {mode === 'stats' && (
        <>
          <div className="row g-3 mb-4 align-items-center">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Search team name"
                value={searchName}
                onChange={e=>setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={conference}
                onChange={e=>setConference(e.target.value)}
              >
                <option value="">All Conferences</option>
                {conferences.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={division}
                onChange={e=>setDivision(e.target.value)}
              >
                <option value="">All Divisions</option>
                {divisions.map(d=><option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={stat}
                onChange={e=>setStat(e.target.value)}
              >
                <option value="">All Stats</option>
                {statsOptions.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
              </select>
            </div>
            <div className="col-md-1">
              <select
                className="form-select"
                value={sortOrder}
                onChange={e=>setSortOrder(e.target.value)}
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={fetchTeams}>
                Apply
              </button>
            </div>
          </div>

          <div className="card p-3 shadow-sm">
            {error ? (
              <div className="alert alert-warning m-0">{error}</div>
            ) : !searched ? (
              <div className="text-muted">
                Enter a team name or filters and click “Apply.”
              </div>
            ) : results.length === 0 ? (
              <div className="alert alert-info m-0">
                No matching teams found. Please adjust your search or filters.
              </div>
            ) : view==='weekly' ? (
              <WeeklyStats data={results}/>
            ) : (
              <YearlyStats data={results}/>
            )}
          </div>
        </>
      )}

      {mode === 'compare' && (
        <>
          <div className="row g-3 mb-4 align-items-center">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Team 1"
                value={t1}
                onChange={e=>setT1(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Team 2"
                value={t2}
                onChange={e=>setT2(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={cmpStat}
                onChange={e=>setCmpStat(e.target.value)}
              >
                <option value="">Select Stat</option>
                {allYearlyStats.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-primary w-100" onClick={fetchCompare}>
                Compare
              </button>
            </div>
          </div>
          <div className="card p-3 shadow-sm">
            <ComparisonChart
              data1={d1} data2={d2}
              label1={t1} label2={t2}
              statKey={cmpStat}
            />
          </div>
        </>
      )}
    </>
  );
}
