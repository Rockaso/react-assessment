import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Welcome } from './modules/Welcome';
import { Itineraries } from './modules/Itineraries';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/app" element={<App />} />
            <Route path="./modules/Itineraries" element={<Itineraries/>} />
        </Routes>
    </BrowserRouter>
);