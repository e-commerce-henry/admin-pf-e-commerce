import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Users from './components/Users/Users'
import Inventory from './components/Inventory/Inventory'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/Users' element={<Users />} />
        <Route exact path='/Inventory' element={<Inventory />} />
        <Route exact path='/Orders' element={<Users />} />
        <Route exact path='/Category' element={<Users />} />
        <Route exact path='/Favorite' element={<Users />} />
        <Route exact path='/SalesBanner' element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
