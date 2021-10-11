import React, {useState} from "react";
import { useFormik } from "formik";
import { login } from "../services";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/common.scss";
import { Link } from "react-router-dom";
toast.configure();
const Login = ({history}) => {
  const [errorMessage, setErrormessage] = useState("")
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        console.log(response);
        localStorage.setItem("authenticatedUser", JSON.stringify(response.data?.data));
        toast("Logged in successfully!");
        history.push("/");
        window.location.reload();

      } catch (err) {
        console.log(err.response.data.message);
        setErrormessage(err.response.data.message);
        toast("Unable to login!!");
      }
    },
    validate: (value) => {
        const error = {};
        if (!value.email) error.email = "The field is mandatory";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value.email))
          error.email = "invalid email address";
        if (!value.password) error.password = "The field is mandatory";
        return error;
      },
  });
  return (
    <div className="parentContainer">
      <div className="formContainer"></div>
      <div className="uiContainer">
        <form onSubmit={formik.handleSubmit}>
          <h4>Login</h4>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={(formik.errors?.email && formik.touched?.email)? "borderRed": ""}
          />
          {formik.errors?.email && formik.touched?.email && (<div className="validation"><span>{formik.errors?.email}</span></div>)}
          <div className="labelContainer">
            <label>Password</label>
            <label>
              <Link to="/forgot-password">Forgot your password?</Link>
            </label>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={(formik.errors?.password && formik.touched?.password)? "borderRed": ""}
          />
          {formik.errors?.password && formik.touched?.password && (<div className="validation"><span>{formik.errors?.password}</span></div>)}
          <div className="validation"><span>{errorMessage}</span></div>
          <div className="buttonContainer">
            <button type="submit">Login</button>
          </div>
          <div className="textContainer">
            <p>
              New to MyJobs? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;