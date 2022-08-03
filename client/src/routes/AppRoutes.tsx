import { Route, Routes } from 'react-router-dom';
import {
    Blog,
    BestChoice,
    AboutUs,
    NotFound, Plants, Flowers, Product
} from '../pages/index.pages';
import React from 'react';

export const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/flowers' element={<Flowers />} />
        <Route path='/plants' element={<Plants />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/bestChoice' element={<BestChoice />} />
        <Route path='/product' element={<Product />} >
        </Route>
    </Routes>
);
