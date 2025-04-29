// src/components/Teams/YearlyStats.js
import React from 'react';

const humanize = s =>
  s.split('_')
   .map(w => w[0].toUpperCase() + w.slice(1))
   .join(' ');

export default function YearlyStats({ data }) {
  if (!data || data.length === 0) {
    return <div>No data matches your filters.</div>;
  }

  // always show season, then team_name, then stats
  const preferred = [
    'season',
    'team_name',
    'total_yards',
    'total_tds',
    'passing_yards',
    'passing_tds',
    'rushing_yards',
    'rushing_tds',
    'win_pct',
    'record',
    'fumble',
    'fumble_lost',
    'field_goal_attempt',
    'fg_points'
  ];

  const available = Object.keys(data[0]);
  const cols = preferred.filter(c => available.includes(c));

  return (
    <div className="table-responsive">
      <table className="table table-striped mb-0">
        <thead>
          <tr>
            {cols.map(c => <th key={c}>{humanize(c)}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {cols.map(c => <td key={c}>{row[c]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
