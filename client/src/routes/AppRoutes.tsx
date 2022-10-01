import { Route, Routes } from 'react-router-dom'
import React from 'react'
import {
  AboutUs,
  Contacts,
  NotFound,
  Product,
  Products,
} from '../pages/index.pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/products" element={<Products />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  )
}
