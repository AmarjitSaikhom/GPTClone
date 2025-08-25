import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const RegisterHandler = async (data) => {
    try {
      setIsSubmitting(true);

      await axios.post("http://localhost:3000/api/auth/register", {
        email: data.email,
        fullName: {
          firstName: data.firstname,
          lastName: data.lastname
        },
        password: data.password
      },

        { withCredentials: true }

      );

      reset();
      navigate("/")

    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  }



  return (
    <section className="register">
      <div className="register-container">
        <header>
          <h1>Register Account</h1>
          <p>Welcome to the world of AI</p>
        </header>

        <form onSubmit={handleSubmit(RegisterHandler)}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input {...register("email", {
              required: "Email is required",
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: "Invalid email address"
              // }
            })} id="email" type="email" name="email" autoComplete="email" placeholder="Email address" />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="fullname">
            <div className="field-group">
              <label htmlFor="firstname">First Name</label>
              <input {...register("firstname", {
                required: "First name is required",
              })} id="firstname" type="text" name="firstname" placeholder="Jane" />
              {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
            </div>
            <div className="field-group">
              <label htmlFor="lastname">Last Name</label>
              <input {...register("lastname", {
                required: "Last name is required",
              })} id="lastname" type="text" name="lastname" placeholder="Doe" />
              {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              // pattern: {
              //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              //   message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
              // }
            })} id="password" type="password" name="password" autoComplete="new-password" placeholder="password" />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-alt">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  )
}

export default RegisterPage
