import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios";

const LoginPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const SubmitHandler = (data) => {
    setSubmitting(true);

    axios.post("http://localhost:3000/api/auth/login", {
      email: data.email,
      password: data.password
    },

      { withCredentials: true }

    ).then((res) => {
      reset()
      navigate("/")

    }).catch((err) => {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setSubmitting(false)
    })
  }

  return (
    <section className="login">
      <div className="login-container">
        <header>
          <h1>Login</h1>
          <p>Welcome back to the world of AI</p>
        </header>

        <form onSubmit={handleSubmit(SubmitHandler)}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              {...register("email", { 
                required: "Email is required",
                // pattern: {
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   message: "Invalid email address"
                // }
              })} 
              type="email" 
              name="email" 
              autoComplete="email" 
              placeholder="Email address" 
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 4, message: "Password must be at least 6 characters" }
              })} 
              type="password" 
              name="password" 
              autoComplete="current-password" 
              placeholder="Password" 
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button className="primary-btn" disabled={submitting}>
            {submitting ? 'Logging...' : 'Login'}
          </button>
        </form>

        <p className="auth-alt">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </section>
  )
}

export default LoginPage;
