import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth.context";
import { register, login, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading, initialized, setInitialized } = context

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
            await logout();
            setUser(null);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        const hydrateUser = async () => {
            setLoading(true);

            try {
                const data = await getMe();

                if (isMounted) {
                    setUser(data.user);
                }
            } catch (error) {
                if (isMounted) {
                    setUser(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                    setInitialized(true);
                }
            }
        };

        if (!initialized) {
            hydrateUser();
        }

        return () => {
            isMounted = false;
        };
    }, [initialized, setInitialized, setLoading, setUser]);

    return {
        user,
        loading,
        initialized,
        handleLogin,
        handleRegister,
        handleLogOut
    };
}
