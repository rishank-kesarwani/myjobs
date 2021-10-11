import React from "react";
import { useFormik } from "formik";
import { forgotPassword } from "../services";
import "../css/common.scss";

const ForgotPassword = ({history}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await forgotPassword(values);
        console.log(response);
        if (response?.data?.success) {
          history.push("/reset-password/"+response.data?.data?.token)
        }
      } catch (err) {
        console.log(err.code);
      }
    },
  });
  return (
    <div className="parentContainer">
      <div className="formContainer"></div>
      <div className="uiContainer">
        <form onSubmit={formik.handleSubmit}>
          <h4>Forgot your password?</h4>
          <label className="forgotInstruction">
            Enter the email associated with your account and we’ll send you
            instructions to reset your password.
          </label>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="buttonContainer">
            {/* <Link to="/reset-password"> */}
              <button type="submit" className="forgotSubmit">
                Submit
              </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
