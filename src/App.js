import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Users from './components/Users/Users'
import Inventory from './components/Inventory/Inventory'
import Orders from './components/Orders/Orders'
import Favorite from './components/Favorite/Favorite'
import SalesBanner from './components/SalesBanner/SalesBanner'
import Categorys from "./components/Category/Category";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/Users' element={<Users />} />
        <Route exact path='/Inventory' element={<Inventory />} />
        <Route exact path='/Orders' element={<Orders />} />
        <Route exact path='/Category' element={<Categorys />} />
        <Route exact path='/Favorite' element={<Favorite />} />
        <Route exact path='/SalesBanner' element={<SalesBanner />} />
      </Routes>
    </>
  );

}

export default App;
