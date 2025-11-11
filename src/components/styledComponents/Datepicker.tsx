import { makeStyles } from "@mui/styles";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import type { DateRangeType } from "../../types/common";

type Props = {
  options: { label: string; value: string }[];
  onDateRangeChange: (tempDateRange: DateRangeType[]) => void;
  customWidth?: string;
};

const useStyles = makeStyles({
  select: {
    width: "100%",
    height: "30px",
    marginBottom: "10px",
  },
  button: {
    background: "#1E52CC",
    color: "#fff",
  },
  dateRange: {
    maxHeight: "300px",
    overflow: "auto",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "4px",
    maxWidth: "287px",
    padding: "10px",
    "& .rdrMonth": { width: "20.667em", padding: "0 0.833em 0 0.833em" },
  },
  datePicker: {
    border: "1px solid black",
    width: ({ customWidth }: { customWidth: string }) => customWidth,
    height: "28px",
    borderRadius: "3px",
    display: "flex",
    padding: "5px",
  },
  menu: {
    marginTop: "10px",
    "& .MuiMenuItem-root": {
      display: "flex !important",
      justifyContent: "space-between !important",
      width: "100% !important",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
  dateLabel: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "6% 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});

const DatePicker: FC<Props> = (props) => {
  const {
    options = [{ label: "Quick Filter", value: "custom" }],
    onDateRangeChange,
    customWidth = "38%",
  } = props;
  const classes = useStyles({ customWidth });
  const [tempDateRange, setTempDateRange] = useState<DateRangeType[]>([]);
  const [selectedPreset, setSelectedPreset] = useState("all");
  const [visibleDate, setVisibleDate] = useState("All");
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // un comment for default as today view
    // const date = new Date();
    // const [startDate, endDate] = [new Date(date), new Date(date)];
    // endDate.setHours(23, 59, 59);
    // startDate.setHours(0, 0, 0, 0);
    setTempDateRange([
      {
        startDate: new Date(0),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    onDateRangeChange([
      {
        startDate: new Date(0),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  }, []);

  const convertStringDate = (start: Date, end: Date) =>
    start.getDate() +
    "/" +
    (start.getMonth() + 1) +
    "/" +
    start.getFullYear() +
    (end instanceof Date
      ? "-" +
        end.getDate() +
        "/" +
        (end.getMonth() + 1) +
        "/" +
        end.getFullYear()
      : "");

  const handlePresetClick = (preset: string) => {
    const currentDate = new Date();
    let startDate;
    let endDate;

    switch (preset) {
      case "oneWeek":
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        endDate = currentDate;
        break;
      case "today":
        startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0);
        endDate = currentDate;
        setVisibleDate("Today");
        break;
      case "lastFifteenDays":
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 15);
        startDate.setHours(0, 0, 0, 0);
        endDate = currentDate;
        break;
      case "lastMonth":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        startDate.setHours(0, 0, 0, 0);
        endDate = currentDate;
        break;
      case "oneHour":
        startDate = new Date(currentDate);
        startDate.setHours(startDate.getHours() - 1);
        endDate = currentDate;
        setVisibleDate("Last Hour");
        break;
      case "twoHours":
        startDate = new Date(currentDate);
        startDate.setHours(startDate.getHours() - 2);
        endDate = currentDate;
        setVisibleDate("Last Two Hours");
        break;
      case "fourHours":
        startDate = new Date(currentDate);
        startDate.setHours(startDate.getHours() - 4);
        endDate = currentDate;
        setVisibleDate("Last Four Hours");
        break;
      case "all":
        startDate = new Date(0);
        endDate = new Date();
        setVisibleDate("All");
        break;
      case "custom":
      default:
        startDate = new Date();
        endDate = new Date();
    }
    if (["oneWeek", "lastFifteenDays", "lastMonth"].includes(preset))
      setVisibleDate(convertStringDate(startDate, endDate));

    setTempDateRange([{ startDate, endDate, key: "selection" }]);
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    setTempDateRange([ranges.selection as DateRangeType]);
    setSelectedPreset("custom");
    setVisibleDate(
      convertStringDate(
        ranges.selection.startDate as Date,
        ranges.selection.endDate as Date
      )
    );
  };
  const handlePresetChange = (event: SelectChangeEvent) => {
    setSelectedPreset(event.target.value);
    handlePresetClick(event.target.value);
  };

  const handleOK = async () => {
    onDateRangeChange(tempDateRange);
    setProfileAnchor(null);
  };

  return (
    <Box className={classes.datePicker}>
      <Box
        className={classes.dateLabel}
        onClick={(e) => setProfileAnchor(e.currentTarget)}
      >
        <Typography>{visibleDate}</Typography>
        <InsertInvitationIcon />
      </Box>
      <Menu
        className={classes.menu}
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
        anchorEl={profileAnchor}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem key="options" disableRipple>
          <Select
            className={classes.select}
            value={selectedPreset}
            onChange={handlePresetChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </MenuItem>
        <MenuItem key="datepicker" disableRipple>
          <DateRange
            editableDateInputs
            onChange={handleSelect}
            moveRangeOnFirstSelection
            ranges={tempDateRange}
            className={classes.dateRange}
          />
        </MenuItem>
        <MenuItem key="buttons" disableRipple>
          <Button
            variant="contained"
            onClick={() => setProfileAnchor(null)}
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleOK}
            className={classes.button}
          >
            OK
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default DatePicker;
