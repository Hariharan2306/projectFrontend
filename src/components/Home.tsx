import { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import donationIcon from "../assets/donationIcon.svg";
import orphanageLogo from "../assets/orphanageLogo.svg";
import donationLogo from "../assets/donationLogo.svg";
import { useNavigate } from "react-router-dom";
import TimedAlert from "./TimedAlert";
import { RootState } from "../apis/rootReducer";
import {
  errorMessageSelector,
  successMessageSelector,
} from "../selectors/userSelector";
import usersActions from "../actions/usersActions";
import type { AlertProps } from "../types/common";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, #e0f7dc, #fff7b8, #ffdab3)",
    height: "100vh",
  },
  mainCard: {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    margin: "10vh auto auto auto",
    flexDirection: "column",
    width: "45vw",
    padding: "7% 7% 5% 7%",
    backgroundColor: "#f5f5c0 !important",
    "& .MuiPaper-root": {
      width: "20vw",
      height: "24vh",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#f0f8d8",
      transition: "background-color 0.5s ease",
      "&:hover": {
        transform: "scale(1.05)",
        backgroundColor: "#f4c553",
      },
    },
  },
  icons: { width: "7vw", height: "7vh", marginLeft: "4vw" },
  donorTypo: {
    margin: "1.5vw 9vh !important",
    fontFamily: "Poppins !important",
  },
  recieverTypo: {
    margin: "1.5vw 8vh !important",
    fontFamily: "Poppins !important",
  },
  logoIcon: { width: "60px", margin: "1% 2% 2% 2%" },
  box: { display: "flex", justifyContent: "space-between" },
  signupBox: {
    margin: "auto",
    "& .MuiButtonBase-root": {
      justifyContent: "center",
      marginTop: "20px",
      background: "#97a885",
    },
  },
});

const Home: FC<AlertProps> = ({ successMessage, error, resetMessage }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
      <TimedAlert resetMessage={resetMessage} message={error} type="error" />
      <TimedAlert
        resetMessage={resetMessage}
        message={successMessage}
        type="success"
      />
      <Box className={classes.root}>
        <Box>
          <img className={classes.logoIcon} src={donationLogo} alt="logo" />
        </Box>
        <Card className={classes.mainCard}>
          <Box className={classes.box}>
            <Card>
              <CardContent onClick={() => navigate("/login")}>
                <img className={classes.icons} src={donationIcon} alt="Donor" />
                <Typography className={classes.donorTypo} variant="h4">
                  Donor
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent onClick={() => navigate("/login")}>
                <img
                  className={classes.icons}
                  src={orphanageLogo}
                  alt="Receiver"
                />
                <Typography className={classes.recieverTypo} variant="h4">
                  Receiver
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box className={classes.signupBox}>
            <Button variant="contained" onClick={() => navigate("/register")}>
              Sign up
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetMessage: () => dispatch(usersActions.resetMessage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
