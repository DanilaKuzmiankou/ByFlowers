import {Route, Routes} from 'react-router-dom';
import {AboutUs, BestChoice, Blog, Login, NotFound, Product, Products, Signin} from '../pages/index.pages';
import React from 'react';

export const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/products' element={<Products />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/bestChoice' element={<BestChoice />} />
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
    </Routes>
);
