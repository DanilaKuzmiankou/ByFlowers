import {Route, Routes} from 'react-router-dom';
import {AboutUs, BestChoice, Blog, Flowers, Login, NotFound, Plants, Product, Signin} from '../pages/index.pages';
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
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
    </Routes>
);
