import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error("Couldn't find #root");
const root = createRoot(container);
root.render(<App />);