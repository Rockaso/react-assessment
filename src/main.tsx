import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Welcome } from './modules/Welcome';
import { Itineraries } from './modules/Itineraries';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            {/* Route for the Welcome component */}
            <Route path="/" element={<Welcome />} />
            {/* Route for the App component */}
            <Route path="/app" element={<App />} />
            {/* Route for the Itineraries component */}
            <Route path="./modules/Itineraries" element={<Itineraries onSelect={(itinerary) => { /* handle selection */ }} />} />
        </Routes>
    </BrowserRouter>
);