import React, { useEffect, useState } from "react";
import "../css/jobs.scss";
import { getPostedJobs, getCandidates } from "../services/index";
import writing from "../assets/Images/writing.png";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Pagination } from "@mui/material";
const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [candidatesList, setcandidatesList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    pagination: {
      position: "absolute",
      bottom: "-4%",
      left: "40%",
    },
    emptyJobs: {
      backgroundColor: "#dedede",
      display: "flex",
      margin: "10% auto",
      justifyContent: "center",
    },
    emptyImage: {
      width: "85px",
      height: "106px",
    },
    emptyDescription: {
      fontSize: "20px",
      color: "#303F60",
      marginTop: "20px",
    },
    boxStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      bgcolor: "background.paper",
      borderRadius: 5,
      boxShadow: 24,
      p: 4,
      focus: "none",
      height: 550,
    },
    headerStyle: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 2,
    },
    bodyStyle: {
      mt: 2,
      backgroundColor: "#dedede",
      display: "flex",
      flexWrap: "wrap",
      margin: "0 auto",
      justifyContent: "left",
      borderRadius: 5,
      overflowY: "scroll",
      overflowX: "hidden",
      height: 450,
      "-webkit-overflow-scrolling": "touch",
    },
    allCandidates: {
      background: "#fff",
      display: "flex",
      margin: "8px auto",
      width: "40%",
      flexDirection: "column",
      justifyContent: "left",
      padding: 2,
      borderRadius: 2,
      border: "1px solid #303F6080",
    },
    candidateContainer: {
      marginBottom: 2,
      display: "flex",
      flexDirection: "row",
    },
    nameContainer: {
      display: "flex",
      flexDirection: "column",
    },
    nameHeading: {
      fontSize: 15,
      color: "#303f60",
    },
    email: {
      fontSize: 15,
      color: "#303f60",
      opacity: 0.8,
      mt: 2,
      marginTop: "0px",
    },
    skills: {
      fontSize: 13,
      color: "#303f60",
    },
    candidateSkill: {
      fontSize: 15,
      color: "#303f60",
      opacity: 0.8,
      mt: 2,
    },
    candidateLogo: {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      backgroundColor: "#D9EFFF",
      position: "relative",
      mt: 2,
      marginTop: "0px",
      marginRight: 2,
    },
    candidateLogoName: {
      position: "absolute",
      left: "17px",
      top: "13px",
      letterSpacing: "0px",
      color: "#303F60",
      opacity: 0.8,
      fontSize: "16px",
      fontWeight: 400,
      textTransform: "capitalize",
    },
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await getPostedJobs(1);
        // console.log(response.data?.data?.data?.length);
        if (response.data?.data?.data?.length > 0) {
          setJobsList(response.data?.data?.data);
          setCurrentPage(1);
          setPageCount(
            Math.ceil(response.data?.data?.metadata?.count/20)
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const getJobs = async (event, pagen) => {
    try {
      const response = await getPostedJobs(pagen);
      // console.log(response.data?.data?.data?.length);
      if (response.data?.data?.data?.length > 0)
        setJobsList(response.data?.data?.data);
      setCurrentPage(pagen);
    } catch (error) {
      console.log(error);
    }
  };

  const getcandidatesList = async (jobId) => {
    handleOpen();
    try {
      const response = await getCandidates(jobId);
      if (response.data?.data?.length > 0)
        setcandidatesList(response.data?.data);
      console.log("candidates", response.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setcandidatesList([]);
    handleClose();
  };

  return (
    <>
      <div className="mainContainer">
        <div className="formContainer">
          <div className="jobsHeading">
            <h3>Jobs posted by you</h3>
          </div>
        </div>
        <div className="jobContainer">
          {/* {jobsList.length ? <FullJobs jobsList= {jobsList}/> : <EmptyJobs jobsList= {jobsList}/> } */}
          <div className="allJobContainer">
            {jobsList.length ? (
              jobsList.map((job) => {
                return (
                  <div className="allJobs">
                    <h4>{job.title}</h4>
                    <p>{job.description}</p>
                    <div className="application">
                      <p className="location">
                        <LocationOnOutlinedIcon /> <span>{job.location}</span>
                      </p>
                      <button
                        className="viewApplication"
                        onClick={() => {
                          getcandidatesList(job.id);
                        }}
                      >
                        View applications
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="noJobs">
                <img src={writing} alt="writing-icons" />
                <h4>Your posted jobs will show here!</h4>
                <Link to="/post-job">
                  <div className="jobButton">
                    <button>Post a job</button>
                  </div>
                </Link>
              </div>
            )}
            <Pagination sx={style.pagination} count={pageCount} page={currentPage} onChange={getJobs} />
          </div>
        </div>
      </div>
      <div className="modalContainer">
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.boxStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={style.headerStyle}
            >
              Applicants for this job
              <CloseOutlinedIcon onClick={closeModal} />
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={{
                fontSize: 15,
                borderTop: "1px solid #4D618E",
                paddingTop: 1,
                paddingBottom: 2,
              }}
            >
              {candidatesList.length} applications
            </Typography>
            <Typography id="modal-modal-description" sx={style.bodyStyle}>
              { candidatesList.length ? (candidatesList.map((candidate) => {
                return (
                  <Box sx={style.allCandidates}>
                    <Box sx={style.candidateContainer}>
                      <Typography sx={style.candidateLogo}>
                        <Typography sx={style.candidateLogoName}>
                          {candidate?.name[0]}
                        </Typography>
                      </Typography>
                      <Box sx={style.nameContainer}>
                        <Typography
                          variant="h6"
                          component="h5"
                          sx={style.nameHeading}
                        >
                          {candidate.name}{" "}
                        </Typography>
                        <Typography sx={style.email}>
                          {candidate.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.skillContainer}>
                      <Typography variant="h6" component="h5" sx={style.skills}>
                        Skills
                      </Typography>
                      <Typography sx={style.candidateSkill}>
                        {candidate.skills}
                      </Typography>
                    </Box>
                  </Box>
                );
              }) ): (
              <Box sx={style.emptyJobs}>
                <Box sx={{display: "flex", flexDirection:"column", justifyContent: "center"}}>
                <img src={writing} alt="writing-icons" style={{width: "85px", height: "106px", margin: "0 auto"}}/>
                <Typography 
                    sx={style.emptyDescription}
                    variant="h6"
                    component="h4"
                 >Your posted jobs will show here!</Typography>
                 </Box>
              </Box>
              )}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Jobs;
