import { Box, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import donationLogo from "../assets/donationLogo.svg";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, #e0f7dc, #fff7b8, #ffdab3)",
    height: "100vh",
  },
  logoIcon: { width: "60px", margin: "2%" },
});

const Login = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <img className={classes.logoIcon} src={donationLogo} alt="logo" />
      </Box>
      <Card></Card>
    </Box>
  );
};
export default Login;
