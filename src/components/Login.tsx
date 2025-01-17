import { FC, useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import donationLogo from "../assets/donationLogo.svg";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import usersActions from "../actions/usersActions";
import type { LoginDetails, LoginProps } from "../types/common";

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
});

const Login: FC<LoginProps> = ({ loginUser }: LoginProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    navigate("/dashboard");
    loginUser({ userMail, password });
  };

  return (
    <Box className={classes.root}>
      <img className={classes.logoIcon} src={donationLogo} alt="logo" />

      <Card className={classes.card}>
        <Typography className={classes.equalMargin} variant="h4">
          Login as Reciever
        </Typography>

        <Box className={classes.equalMargin}>
          <Typography>Username</Typography>
          <TextField
            className={classes.equalMargin}
            placeholder="Enter Username or Email"
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
          />
        </Box>
        <Box className={classes.equalMargin}>
          <Typography>Password</Typography>
          <TextField
            className={classes.equalMargin}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          className={classes.equalMargin}
          variant="contained"
          onClick={() => onLogin()}
        >
          Log in
        </Button>
      </Card>
    </Box>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (loginDetails: LoginDetails) =>
    dispatch(usersActions.loginUser(loginDetails)),
});

export default connect(null, mapDispatchToProps)(Login);
