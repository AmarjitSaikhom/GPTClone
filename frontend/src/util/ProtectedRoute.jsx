import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "../api/axiosconfic";
import { loginUser } from "../store/reducers/authSlice";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/auth/me", {
                    withCredentials: true,
                });
                dispatch(loginUser(res.data.user));
            } catch (err) {
                console.log("Unauthorized", err)
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // 👈 you can replace with a spinner
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
