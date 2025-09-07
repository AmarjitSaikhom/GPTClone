import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form"
import { register_user } from "../../store/actions/userAction";
import { useState } from "react";
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRegisterUser = (userInfo) => {
    dispatch(register_user(userInfo, navigate, setIsSubmitting));
  }

  return (
    <section className="register">
      <div className="register-container">
        <header>
          <h1>Register Account</h1>
          <p>Welcome to the world of AI</p>
        </header>

        <form onSubmit={handleSubmit(handleRegisterUser)}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input {...register("email", { required: true })} id="email" type="email" name="email" autoComplete="email" placeholder="Email address" />
          </div>
          <div className="fullname">
            <div className="field-group">
              <label htmlFor="firstname">First Name</label>
              <input {...register("firstName", { required: true })} id="firstname" type="text" name="firstName" placeholder="Jane" />
            </div>
            <div className="field-group">
              <label htmlFor="lastname">Last Name</label>
              <input {...register("lastName", { required: true })} id="lastname" type="text" name="lastName" placeholder="Doe" />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input {...register("password", { required: true })} id="password" type="password" name="password" autoComplete="new-password" placeholder="password" />
          </div>

          <button className="primary-btn">
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-alt">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  )
}

export default RegisterPage
