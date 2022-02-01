import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
	const { auth } = useAuth();
	const location = useLocation();
	return auth?.token ? (
		<Navigate to="/home" state={{ from: location }} replace />
	) : (
		<Outlet />
	);
};

export default PublicRoute;
