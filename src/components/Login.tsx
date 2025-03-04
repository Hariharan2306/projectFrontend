import { FC, useEffect, useRef, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import isEmpty from "lodash/isEmpty";
import donationLogo from "../assets/donationLogo.svg";
import usersActions from "../actions/usersActions";
import { RootState } from "../apis/rootReducer";
import type { LoginDetails, LoginProps } from "../types/common";
import TimedAlert from "./TimedAlert";
import {
  errorMessageSelector,
  successMessageSelector,
  userDataSelector,
} from "../selectors/userSelector";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, #e0f7dc, #fff7b8, #ffdab3)",
    height: "100vh",
  },
  logoIcon: { width: "60px", margin: "1% 2% 2% 2%" },
  card: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "5vh 4vw",
    width: "20vw",
    margin: "4vh auto",
  },
  equalMargin: {
    margin: "2vh 0 !important",
    "& .MuiTextField-root": {
      width: "100% !important",
      marginTop: "2px !important",
    },
  },
  login: { alignSelf: "center" },
});

const Login: FC<LoginProps> = ({
  loginUser,
  successMessage,
  error,
  resetMessage,
  userCred,
}: LoginProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formDataRef = useRef({ userMail: "", password: "" });

  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");

  const setState = { userMail: setUserMail, password: setPassword };

  useEffect(() => {
    if (!isEmpty(userCred))
      sessionStorage.setItem("loggedUserData", JSON.stringify(userCred));
    if (!isEmpty(successMessage)) {
      resetMessage();
      navigate("/dashboard");
    }
  }, [successMessage, userCred]);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") loginUser(formDataRef.current);
    };
    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  }, []);

  const handleInputs = (id: "userMail" | "password", value: string) => {
    formDataRef.current[id] = value;
    setState[id](value);
  };

  return (
    <Box className={classes.root}>
      <TimedAlert resetMessage={resetMessage} message={error} type="error" />
      <TimedAlert
        resetMessage={resetMessage}
        message={successMessage}
        type="success"
      />
      <img className={classes.logoIcon} src={donationLogo} alt="logo" />

      <Card className={classes.card}>
        <Box className={`${classes.login} ${classes.equalMargin}`}>
          <Typography variant="h4">Login</Typography>
        </Box>

        <Box className={classes.equalMargin}>
          <Typography>Username</Typography>
          <TextField
            className={classes.equalMargin}
            placeholder="Enter Username or Email"
            value={userMail}
            onChange={(e) => handleInputs("userMail", e.target.value)}
          />
        </Box>
        <Box className={classes.equalMargin}>
          <Typography>Password</Typography>
          <TextField
            className={classes.equalMargin}
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => handleInputs("password", e.target.value)}
          />
        </Box>
        <Button
          className={classes.equalMargin}
          variant="contained"
          onClick={() => loginUser({ userMail, password })}
        >
          Log in
        </Button>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
  userCred: userDataSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (loginDetails: LoginDetails) =>
    dispatch(usersActions.loginUser(loginDetails)),
  resetMessage: () => dispatch(usersActions.resetMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
