import React, { useState } from "react";
import { useFormik } from "formik";
import { register } from "../services";
import "../css/common.scss";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
toast.configure();
const SignUp = ({history}) => {
  const [active, setActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        console.log(response);
        if (response?.data?.success) {
          toast("User Registered Successfully!");
          history.push("/login");
        }
      } catch (err) {
        console.log(err);
        toast("Something went wrong");
      }
    },
    validate: (value) => {
      const error = {};
      if (!value.fullName) error.fullName = "The field is mandatory";
      if (!value.email) error.email = "The field is mandatory";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value.email))
        error.email = "invalid email address";
      if (!value.password) error.password = "The field is mandatory";
      if (!value.confirmPassword)
        error.confirmPassword = "The field is mandatory";
        else if(value.password !== value.confirmPassword) error.confirmPassword = "Passwords do not match!";

      return error;
    },
  });
  console.log(formik.errors);
  const handleActive = () => {
    setActive(!active);
  };
  return (
    <div className="parentContainer">
      <div className="formContainer"></div>
      <div className="uiContainer">
        <form onSubmit={formik.handleSubmit}>
          <h4>Signup</h4>
          <label className="icon_label">I’m a*</label>
          <div className="userType">
            <button
              onClick={handleActive}
              className={`icons${active ? "-active" : ""}`}
              type='button'
            >
              <PersonSearchIcon />
              <span>Recruiter</span>
            </button>
            <button
              onClick={handleActive}
              className={`icons${!active ? "-active" : ""}`}
              type='button'
            >
              <PersonOutlineIcon />
              <span>Candidate</span>
            </button>
          </div>
          <label>Full name*</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter your full name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={(formik.errors?.fullName && formik.touched?.fullName)? "borderRed": ""}
          />
          {formik.errors?.fullName && formik.touched?.fullName && (<div className="validation"><span>{formik.errors?.fullName}</span></div>)}
          <label>Email address*</label>
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
          <div className="passWordContainer">
            <div className="create_password">
              <label>Create Password*</label>
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
            </div>
            <div className="confirm_password">
              <label>Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={(formik.errors?.confirmPassword && formik.touched?.confirmPassword)? "borderRed": ""}
              />
              {formik.errors?.confirmPassword && formik.touched?.confirmPassword && (<div className="validation"><span>{formik.errors?.confirmPassword}</span></div>)}
            </div>
          </div>
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            id="skills"
            placeholder="Enter comma separated skills"
            value={formik.values.skills}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // className={(formik.errors?.confirmPassword && formik.touched?.confirmPassword)? "borderRed": ""}
          />
          {/* {formik.errors?.skills && formik.touched?.skills && (<div className="validation"><span>{formik.errors?.skills}</span></div>)} */}
          <div className="buttonContainer">
            <button type="submit">Signup</button>
          </div>
          <div className="textContainer">
            <p>
              Have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
