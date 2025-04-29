// src/components/Teams/WeeklyStats.js
import React from 'react';

const humanize = s =>
  s.split('_')
   .map(w => w[0].toUpperCase() + w.slice(1))
   .join(' ');

export default function WeeklyStats({ data }) {
  if (!data || data.length === 0) {
    return <div>No data matches your filters.</div>;
  }

  // always show season & week, then team_name, then stats
  const preferred = [
    'season',
    'week',
    'team_name',
    'total_yards',
    'passing_yards',
    'rushing_yards',
    'points_scored',
    'touchdowns',
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
