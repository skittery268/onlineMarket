import { Navigate } from "react-router";
import { useAuth } from "../context/Auth.context"

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return user ? children : <Navigate to={"/login"} />;
}

export default ProtectedRoute;