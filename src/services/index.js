import axios from "./axios";

const register = (body) => {
  return axios
    .post("/auth/register", {
      email: body.email,
      userRole: 0,
      password: body.password,
      confirmPassword: body.confirmPassword,
      name: body.fullName,
      skills: body.skills,
    })
};
const login = (body) => {
  return axios
    .post("/auth/login", {
      email: body.email,
      userRole: 0,
      password: body.password,
    })
};
const forgotPassword = (body) => {
  return axios
    .get("auth/resetpassword?email="+body.email)
};
const verifyPasswordToken = (userToken) => {
  return axios
    .get("/auth/resetpassword/"+userToken)
};
const resetPassword = (body, token) => {
  return axios
    .post("/auth/resetpassword", {
      password: body.password,
      confirmPassword: body.confirm_password,
      token: token
    })
};
const postJob = (body) => {
  return axios
    .post("/jobs", {
      title: body.title,
      description: body.description,
      location: body.location,
    })
};
const getPostedJobs = (page) => {
  return axios.get("recruiters/jobs?page="+page);
};

const getCandidates = (jobId) => {
  return axios.get("/recruiters/jobs/"+jobId+"/candidates");
}

export {register, login, forgotPassword, verifyPasswordToken, resetPassword, postJob, getPostedJobs, getCandidates};
