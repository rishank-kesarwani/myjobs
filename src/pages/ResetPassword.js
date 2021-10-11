import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { resetPassword, verifyPasswordToken } from "../services";
import "../css/common.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";
toast.configure();

const ResetPassword = ({history}) => {
  let { resetToken } = useParams();
  //console.log("token", resetToken);

  const [isVerified, setIsVerified] = useState(0);
  const [verifiedToken, setVerifiedToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await verifyPasswordToken(resetToken);
        if (response.data?.success) {
          setIsVerified(1);
          setVerifiedToken(resetToken);
        }
      } catch (err) {
        console.log(err.code);
        setIsVerified(-1);
      }
    })();
    //Below line is only using for hosting purpose in vercel
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await resetPassword(values, verifiedToken);
        console.log(response);
        if (response?.data?.success) {
          toast("Password Resetted Successfully!");
          history.push("/login");
        }
      } catch (err) {
        console.log(err.code);
        toast("Error Occured while resetting password");
      }
    },
  });
  return (
    <>
      {isVerified === 1 && (
        <div className="parentContainer">
          <div className="formContainer"></div>
          <div className="uiContainer">
            <form onSubmit={formik.handleSubmit}>
              <h4>Reset Your Password</h4>
              <label className="forgotInstruction">
                Enter your new password below.
              </label>
              <label>New password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <label>Confirm new password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Enter your password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              />
              <div className="buttonContainer">
                {/* <Link to="/login"> */}
                  <button type="submit" className="forgotSubmit">
                    Reset
                  </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      )}

      {isVerified === 0 && <div>Verifying token....</div>}

      {isVerified === -1 && <div>Verification Failed</div>}
    </>
  );
};

export default ResetPassword;
