import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
	const { user } = useAuth();
	const location = useLocation();
	return user ? (
		<Navigate to="/home" state={{ from: location }} replace />
	) : (
		<Outlet />
	);
};

export default PublicRoute;
