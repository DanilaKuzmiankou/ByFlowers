import { Route, Routes } from 'react-router-dom';
import {
    Blog,
    BestChoice,
    AboutUs,
    NotFound
} from '../pages/index.pages';
import React from 'react';

export const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/bestChoice' element={<BestChoice />} />
    </Routes>
);
