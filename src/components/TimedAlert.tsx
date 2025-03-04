import { FC, useEffect, useRef } from "react";
import { Alert, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import isEmpty from "lodash/isEmpty";
import type { AlertProps } from "../types/common";

const useStyles = makeStyles({
  root: {
    "& .MuiAlert-root": {
      borderRadius: "10px",
      width: "20vw",
      position: "fixed",
      top: "2%",
      left: "76%",
      alignItems: "center",
    },
  },
});
const TimedAlert: FC<AlertProps> = ({ resetMessage, message, type }) => {
  const classes = useStyles();
  const alertRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (alertRef.current && !alertRef.current.contains(e.target as Node))
      resetMessage();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const timeOut = setTimeout(() => {
      resetMessage();
    }, 3000);

    return () => {
      clearTimeout(timeOut);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [message]);

  return isEmpty(message) ? null : (
    <Box className={classes.root} ref={alertRef}>
      <Alert severity={type} onClose={() => resetMessage()}>
        {message}
      </Alert>
    </Box>
  );
};
export default TimedAlert;
