import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import { headerTabs } from "../config/constants";
import donationLogo from "../assets/donationLogo.svg";

const useStyles = makeStyles({
  body: { display: "flex" },
  logoIcon: { width: "60px", margin: "1% 2% 0 2%" },
  tabs: {
    width: "100%",
    margin: "3vh 11vw 1vh 11vw",
    "& .MuiTab-root": { fontSize: "32px !important" },
    "& .MuiTabs-indicator": { backgroundColor: "unset" },
  },
  iconButton: {
    width: "20px",
    height: "20px",
    margin: "2.5% 2% 2% 2% !important",
    "& .MuiSvgIcon-root": { height: "10vh", width: "4vw" },
  },
  userProfile: {
    alignItems: "flex-start !important",
    flexDirection: "column",
  },
});

const Header: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentUrl = window.location.pathname;
  const { userName, email: userMail } = JSON.parse(
    sessionStorage.getItem("loggedUserData") || "{}"
  );

  const [tabValue, setTabValue] = useState("Donations");
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setTabValue(headerTabs.find(({ url }) => url === currentUrl)!.value);
  }, [currentUrl]);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedUserData");
    navigate("/home");
  };

  return (
    <>
      <Box className={classes.body}>
        <img className={classes.logoIcon} src={donationLogo} alt="logo" />
        <Tabs className={classes.tabs} value={tabValue}>
          {headerTabs.map(({ value, url }) => (
            <Tab
              value={value}
              label={value}
              onClick={() => {
                setTabValue(value);
                navigate(`${url}`);
              }}
            />
          ))}
        </Tabs>
        <IconButton
          className={classes.iconButton}
          onClick={(event) => setProfileAnchor(event.currentTarget)}
        >
          <Face6Icon />
        </IconButton>

        <Menu
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          anchorEl={profileAnchor}
          transformOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem key="userDetails" className={classes.userProfile}>
            <Typography>{userName}</Typography>
            <Typography>{userMail}</Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem key="userDetails" onClick={() => navigate("/edit")}>
            <Typography>Edit Location</Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem key="help">
            <Typography>Help </Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem key="logOut" onClick={handleLogout}>
            <Typography>Log out</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Divider />
    </>
  );
};

export default Header;
