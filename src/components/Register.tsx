import { FC, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Card,
  Divider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import donationLogo from "../assets/donationLogo.svg";
import sliderImg1 from "../assets/sliderImg1.png";
import donationSliderImg2 from "../assets/donationSliderImg2.png";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import type { RegisterProps, UserData } from "../types/common";
import usersActions from "../actions/usersActions";

const useStyles = makeStyles({
  logoIcon: { width: "60px", margin: "1% 2% 1% 2%" },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-root": {
      fontSize: "3em",
      marginBottom: "12px",
    },
  },
  inputs: {
    margin: "3% 1%",
    border: "1px solid #00000033",
    padding: "1%",
    "& .MuiOutlinedInput-input": { padding: "12px 14px" },
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    "& .MuiButton-root": { marginTop: "22px !important" },
  },
  inputFields: {
    display: "flex",
    flexDirection: "column",
    margin: "1%",
    width: "20vw",
  },
  switch: { width: "5vw" },
  sliderContainer: {
    position: "relative",
    margin: "auto",
    border: "2px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    width: "45vw",
    height: "100%",
  },
  sliderWrapper: {
    transition: "transform 0.5s ease-in-out",
    display: "flex",
    width: "100%",
  },
  image: { width: "99%", objectFit: "cover" },
});

const Register: FC<RegisterProps> = ({ registerUser }: RegisterProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const url = window.location.pathname;
  const editOnly = url === "/edit";

  const [reciever, setReciever] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [registeredId, setRegisteredId] = useState("");

  const images = [sliderImg1, donationSliderImg2];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  const onSubmit = () => {
    const user: UserData = {
      userName,
      mobile,
      location,
      email,
      reciever,
      registeredId,
    };
    registerUser(user);
    navigate("/dashboard");
  };

  return (
    <>
      <Box className={classes.pageHeader}>
        <img className={classes.logoIcon} src={donationLogo} alt="logo" />
        <Typography variant="h1">
          {editOnly ? "Edit Details" : "Registration"}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Card className={classes.inputs}>
        <Box className={classes.inputBox}>
          <Box className={classes.inputFields}>
            <Typography>User Name</Typography>
            <TextField
              placeholder="Enter unique Username"
              disabled={editOnly}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box className={classes.inputFields}>
            <Typography>Contact</Typography>
            <TextField
              type="mobile"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Box>
          <Box className={classes.inputFields}>
            <Typography>Email</Typography>
            <TextField
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box className={classes.inputFields}>
            <Typography>Location</Typography>
            <TextField
              placeholder="Enter Pincode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.inputBox}>
          <Box className={`${classes.inputFields} ${classes.switch}`}>
            <Typography>Receiver</Typography>
            <Switch
              value={reciever}
              onClick={() => setReciever(!reciever)}
              disabled={editOnly}
            />
          </Box>
          {reciever && (
            <Box className={classes.inputFields}>
              <Typography>Registered ID</Typography>
              <TextField
                placeholder="Enter organization Id"
                value={registeredId}
                onChange={(e) => setRegisteredId(e.target.value)}
              />
            </Box>
          )}
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Card>
      <Box className={classes.sliderContainer}>
        <Box
          className={classes.sliderWrapper}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              className={classes.image}
              src={img}
              alt={`Slide ${index + 1}`}
              key={index}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (user: UserData) => dispatch(usersActions.registerUser(user)),
});

export default connect(null, mapDispatchToProps)(Register);
