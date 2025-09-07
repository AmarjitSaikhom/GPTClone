import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import { useForm } from "react-hook-form";
import { login_user } from "../../store/actions/userAction";
import { useDispatch } from "react-redux"
import { useState } from "react";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const handleLoginUser = (userInfo) => {
    dispatch(login_user(userInfo, navigate, setIsSubmitting))
  }


  return (
    <section className="login">
      <div className="login-container">
        <header>
          <h1>Login</h1>
          <p>Welcome back to the world of AI</p>
        </header>

        <form onSubmit={handleSubmit(handleLoginUser)}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input {...register("email", { required: true })} id="email" type="email" name="email" autoComplete="email" placeholder="Email address" />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input {...register("password", { required: true })} id="password" type="password" name="password" autoComplete="new-password" placeholder="password" />
          </div>

          <button className="primary-btn">
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-alt">Didn't have an account? <Link to="/register">Register</Link></p>
      </div>
    </section>
  )
}

export default LoginPage
