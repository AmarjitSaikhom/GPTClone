import axios from "../../api/axiosconfic";
import { registerUser, loginUser } from "../reducers/authSlice";

export const register_user =
  (user, navigate, setIsSubmitting) => async (dispatch) => {
    try {
      setIsSubmitting(true);

      const res = await axios.post("/api/auth/register", user, {
        withCredentials: true,
      });

      dispatch(registerUser(res.data.user));

      navigate("/");
    } catch (error) {
      console.error("Register failed", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

export const login_user =
  (user, navigate, setIsSubmitting) => async (dispatch) => {
    try {
      setIsSubmitting(true);

      const res = await axios.post("/api/auth/login", user, {
        withCredentials: true,
      });

      dispatch(loginUser(res.data.user));

      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

export const logout_user = (navigate) => async () => {
  try {
    await axios.get("/api/auth/logout", { withCredentials: true });
    navigate("/login");
  } catch (error) {
    console.log("logout failed", error);
  }
};
