import React from "react";
import { useFormik } from "formik";
import { postJob } from "../services";
import "../css/common.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

const PostJobs = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await postJob(values);
        console.log(response);
        if (response?.data?.success) {
          toast("Job Posted successfully");
          history.push("/jobs");
        }
      } catch (err) {
        console.log(err.code);
        toast("Error occured!");
      }
    },
    validate: (value) => {
      const error = {};
      if (!value.title) error.title = "The field is mandatory";
      if (!value.description) error.description = "The field is mandatory";
      if (!value.location) error.location = "The field is mandatory";
      return error;
    }
  });
  return (
    <div className="parentContainer">
      <div className="formContainer"></div>
      <div className="uiContainer">
        <form onSubmit={formik.handleSubmit}>
          <h4>Post a Job</h4>
          <label>Job title*</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter job title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={(formik.errors?.title && formik.touched?.title)? "borderRed": ""}
          />
          {formik.errors?.title && formik.touched?.title && (<div className="validation"><span>{formik.errors?.title}</span></div>)}
          <label>Description*</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter job description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={(formik.errors?.description && formik.touched?.description)? "borderRed": ""}
          />
          {formik.errors?.description && formik.touched?.description && (<div className="validation"><span>{formik.errors?.description}</span></div>)}
          <label>Location*</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter job location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={(formik.errors?.location && formik.touched?.location)? "borderRed": ""}
          />
          {formik.errors?.location && formik.touched?.location && (<div className="validation"><span>{formik.errors?.location}</span></div>)}
          <div className="buttonContainer">
            {/* <Link to="/jobs"> */}
              <button type="submit" className="forgotSubmit">
                Post
              </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
