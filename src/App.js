import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import UsersPanel from "./components/Users/UsersPanel";
import Inventory from "./components/Inventory/Inventory";
import Orders from "./components/Orders/Orders";
import Favorite from "./components/Favorite/Favorite";
import SalesBanner from "./components/SalesBanner/SalesBanner";
import Category from "./components/Category/Category";
import ContactForm from "./components/ContactForm/ContactForm";
import Auth from "./components/Auth/Auth";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import PublicRoute from "./components/RequireAuth/PublicRoutes";

function App() {
	return (
		<>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<Auth />} />
				</Route>
				<Route element={<RequireAuth />}>
					<Route path="/home" element={<Navbar />}>
						<Route path="Users" element={<UsersPanel />} />
						<Route path="Inventory" element={<Inventory />} />
						<Route path="Orders" element={<Orders />} />
						<Route path="Category" element={<Category />} />
						<Route path="Favorite" element={<Favorite />} />
						<Route path="SalesBanner" element={<SalesBanner />} />
						<Route path="ContactForms" element={<ContactForm />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
