import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './dashboard';

import './App.css';
import './global-recources/css/colors.css';

function App() {
    return (
        <Router>
            <Dashboard />
        </Router>
    );
}

export default App;
