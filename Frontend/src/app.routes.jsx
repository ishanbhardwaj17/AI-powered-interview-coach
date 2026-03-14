import { createBrowserRouter } from "react-router";
import { Navigate } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import { useAuth } from "./features/auth/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, loading, initialized } = useAuth();

    if (loading || !initialized) {
        return <main><h1>Loading...</h1></main>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

const AuthRoute = ({ children }) => {
    const { user, loading, initialized } = useAuth();

    if (loading || !initialized) {
        return <main><h1>Loading...</h1></main>;
    }

    return user ? <Navigate to="/" replace /> : children;
};

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthRoute><Login /></AuthRoute>
    },
    {
        path: "/register",
        element: <AuthRoute><Register /></AuthRoute>
    },
    {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>
    },
    {
        path: "/interview/:interviewId",
        element: <ProtectedRoute><Interview /></ProtectedRoute>
    }
])
  
