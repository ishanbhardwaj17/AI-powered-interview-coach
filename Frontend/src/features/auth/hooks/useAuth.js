import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth.context";
import { register, login, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password });
            setUser(data.user)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogOut = async () => {
        setLoading(true);
        try {
            const data = await logout();
            setUser(null);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogOut
    };
}