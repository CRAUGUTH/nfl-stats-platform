// src/pages/Players.js
import React, { useState } from 'react';
import WeeklyStats     from '../components/Players/WeeklyStats';
import YearlyStats     from '../components/Players/YearlyStats';
import ComparisonChart from '../components/Common/ComparisonChart';

const positions       = ['QB','WR','RB','TE'];
const allWeeklyStatsP = [
  'pass_attempts','complete_pass','comp_pct','passing_yards','pass_tds',
  'interceptions','passer_rating','receptions','receiving_yards',
  'reception_tds','ypr','rush_attempts','rushing_yards','rush_tds',
  'ypc','total_tds','total_yards'
];
const allYearlyStatsP = [
  ...allWeeklyStatsP,'pass_ypg','rec_ypg','rush_ypg','ypg'
];

export default function Players() {
  const [mode,        setMode      ] = useState('stats');
  const [view,        setView      ] = useState('weekly');
  const [searchName,  setSearchName] = useState('');
  const [position,    setPosition  ] = useState('');
  const [stat,        setStat      ] = useState('');
  const [sortOrder,   setSortOrder ] = useState('asc');
  const [results,     setResults   ] = useState([]);
  const [searched,    setSearched  ] = useState(false);
  const [error,       setError     ] = useState('');

  // compare mode state
  const [p1,     setP1    ] = useState('');
  const [p2,     setP2    ] = useState('');
  const [cmpStat,setCmpStat] = useState('');
  const [d1,     setD1    ] = useState([]);
  const [d2,     setD2    ] = useState([]);

  const statsOptions = view === 'weekly' ? allWeeklyStatsP : allYearlyStatsP;

  const fetchPlayers = async () => {
    setSearched(true);
    // if no name AND no position filter, error
    if (!searchName.trim() && !position) {
      setError('Please enter a player name or select a position filter.');
      setResults([]);
      return;
    }
    setError('');
    const qs = new URLSearchParams({
      view, searchName, position, stat, sortOrder
    }).toString();
    const res = await fetch(`/api/players?${qs}`);
    setResults(await res.json());
  };

  const resetStats = () => {
    setResults([]);
    setSearched(false);
    setError('');
  };

  const fetchCompare = async () => {
    if (!cmpStat.trim() || !p1.trim() || !p2.trim()) return;
    const mkQS = name => new URLSearchParams({
      view: 'yearly',
      searchName: name,
      stat: cmpStat,
      sortOrder: 'asc'
    }).toString();
    const [r1, r2] = await Promise.all([
      fetch(`/api/players?${mkQS(p1)}`),
      fetch(`/api/players?${mkQS(p2)}`)
    ]);
    const [j1, j2] = await Promise.all([r1.json(), r2.json()]);
    setD1(j1);
    setD2(j2);
  };

  return (
    <>
      <h2 className="page-title">Player Statistics</h2>

      <div className="btn-group mb-3">
        <button
          className={`btn ${mode==='stats'&&view==='weekly'?'btn-success':'btn-outline-success'}`}
          onClick={()=>{setMode('stats');setView('weekly');resetStats();}}
        >Weekly</button>
        <button
          className={`btn ${mode==='stats'&&view==='yearly'?'btn-success':'btn-outline-success'}`}
          onClick={()=>{setMode('stats');setView('yearly');resetStats();}}
        >Yearly</button>
        <button
          className={`btn ${mode==='compare'?'btn-success':'btn-outline-success'}`}
          onClick={()=>{setMode('compare');resetStats();}}
        >Compare</button>
      </div>

      {mode==='stats' ? (
        <>
          <div className="row g-3 mb-4 align-items-center">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Search player name"
                value={searchName}
                onChange={e=>setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={position}
                onChange={e=>setPosition(e.target.value)}
              >
                <option value="">All Positions</option>
                {positions.map(p=><option key={p} value={p}>{p}</option>)}
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
                <option value="desc">Desc</option>)
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" onClick={fetchPlayers}>
                Apply
              </button>
            </div>
          </div>

          <div className="card p-3 shadow-sm">
            {error ? (
              <div className="alert alert-warning m-0">{error}</div>
            ) : !searched ? (
              <div className="text-muted">
                Enter a player name or filter and click “Apply.”
              </div>
            ) : results.length === 0 ? (
              <div className="alert alert-info m-0">
                No matching players found. Please adjust your search or filters.
              </div>
            ) : view==='weekly' ? (
              <WeeklyStats data={results}/>
            ) : (
              <YearlyStats data={results}/>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="row g-3 mb-4 align-items-center">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Player 1"
                value={p1}
                onChange={e=>setP1(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Player 2"
                value={p2}
                onChange={e=>setP2(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={cmpStat}
                onChange={e=>setCmpStat(e.target.value)}
              >
                <option value="">Select Stat</option>
                {allYearlyStatsP.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-success w-100" onClick={fetchCompare}>
                Compare
              </button>
            </div>
          </div>
          <div className="card p-3 shadow-sm">
            <ComparisonChart
              data1={d1} data2={d2}
              label1={p1} label2={p2}
              statKey={cmpStat}
            />
          </div>
        </>
      )}
    </>
  );
}
