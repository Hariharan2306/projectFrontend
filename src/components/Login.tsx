import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import donationLogo from "../assets/donationLogo.svg";
import { useNavigate } from "react-router-dom";

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

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
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
          />
        </Box>
        <Box className={classes.equalMargin}>
          <Typography>Password</Typography>
          <TextField
            className={classes.equalMargin}
            placeholder="Enter Password"
          />
        </Box>
        <Button
          className={classes.equalMargin}
          variant="contained"
          onClick={() => navigate("/dashboard")}
        >
          Log in
        </Button>
      </Card>
    </Box>
  );
};
export default Login;
