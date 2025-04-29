// src/components/Players/YearlyStats.js
import React from 'react';

const humanize = s =>
  s.split('_')
   .map(w => w[0].toUpperCase() + w.slice(1))
   .join(' ');

export default function YearlyStats({ data }) {
  if (!data || data.length === 0) {
    return <div>No data matches your filters.</div>;
  }

  // always show season, then player_name, position, then stats
  const preferred = [
    'season',
    'player_name',
    'position',
    'pass_attempts',
    'complete_pass',
    'comp_pct',
    'passing_yards',
    'pass_tds',
    'interceptions',
    'passer_rating',
    'receptions',
    'receiving_yards',
    'reception_tds',
    'ypr',
    'rush_attempts',
    'rushing_yards',
    'rush_tds',
    'ypc',
    'total_tds',
    'total_yards',
    'pass_ypg',
    'rec_ypg',
    'rush_ypg',
    'ypg'
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
