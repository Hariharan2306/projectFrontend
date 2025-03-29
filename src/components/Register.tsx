import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
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
import usersActions from "../actions/usersActions";
import type { RegisterProps, UserData } from "../types/common";
import TimedAlert from "./styledComponents/TimedAlert";
import type { RootState } from "../apis/rootReducer";
import {
  errorMessageSelector,
  successMessageSelector,
} from "../selectors/userSelector";
import { useNavigate } from "react-router-dom";
import LabeledInputs from "./styledComponents/LabeledInputs";

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

const Register: FC<RegisterProps> = ({
  registerUser,
  successMessage,
  error,
  resetMessage,
}: RegisterProps) => {
  const classes = useStyles();
  const url = window.location.pathname;
  const editOnly = url === "/edit";
  const navigate = useNavigate();

  const [reciever, setReciever] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
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
      password,
      mobile,
      location,
      email,
      reciever,
      registeredId,
    };
    registerUser(user);
    navigate("/home");
  };

  return (
    <>
      <TimedAlert resetMessage={resetMessage} message={error} type="error" />
      <TimedAlert
        resetMessage={resetMessage}
        message={successMessage}
        type="success"
      />
      <Box className={classes.pageHeader}>
        <img className={classes.logoIcon} src={donationLogo} alt="logo" />
        <Typography variant="h1">
          {editOnly ? "Edit Details" : "Registration"}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Card className={classes.inputs}>
        <Box className={classes.inputBox}>
          <LabeledInputs
            label="User Name"
            placeholder="Enter Unique Username"
            value={userName}
            onChange={(value) => setUserName(value)}
          />
          <LabeledInputs
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
          <LabeledInputs
            label="Contact"
            placeholder="Enter mobile number"
            type="mobile"
            value={mobile}
            onChange={(value) => setMobile(value)}
          />
          <LabeledInputs
            label="Email"
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
        </Box>
        <Box className={classes.inputBox}>
          <Box className={classes.inputFields}>
            <Typography>Location</Typography>
            <TextField
              placeholder="Enter Pincode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>

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

const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (user: UserData) => dispatch(usersActions.registerUser(user)),
  resetMessage: () => dispatch(usersActions.resetMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
