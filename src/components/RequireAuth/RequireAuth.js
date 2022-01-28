import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

const RequireAuth = () => {
	const { auth, setAuth } = useAuth();
	const location = useLocation();
	console.log(auth);

	return auth?.token ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
};

export default RequireAuth;
