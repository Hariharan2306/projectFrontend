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

const Register: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const url = window.location.pathname;
  const editOnly = url === "/edit";

  const [reciever, setReciever] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [sliderImg1, donationSliderImg2];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [images.length]);

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
            />
          </Box>
          <Box className={classes.inputFields}>
            <Typography>Contact</Typography>
            <TextField type="mobile" placeholder="Enter mobile number" />
          </Box>
          <Box className={classes.inputFields}>
            <Typography>Email</Typography>
            <TextField placeholder="Enter Email" />
          </Box>

          <Box className={classes.inputFields}>
            <Typography>Location</Typography>
            <TextField placeholder="Enter Pincode" />
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
              <TextField placeholder="Enter organization Id" />
            </Box>
          )}
          <Button variant="contained" onClick={() => navigate("/home")}>
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

export default Register;
