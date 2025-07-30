import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import AllJobs from './pages/AllJobs';
import AddJob from './pages/AddJob';
import UpdateJob from './pages/UpdateJob';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AllJobs />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/update-job" element={<UpdateJob />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
