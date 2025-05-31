import { makeStyles } from "@mui/styles";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
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
  dateRangePickerContainer: {
    position: "relative",
    zIndex: 1,
  },
  dateRangePickerContent: {
    position: "absolute",
    top: "31vh",
    left: "30px",
    marginBottom: "20vh",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    width: "19vw",
    zIndex: 2,
  },
  select: {
    width: "100%",
    height: "30px",
    marginBottom: "10px",
  },
  dateRangePickerExtraField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    width: "315px",
  },
  dateRangePickerField: { width: "150px" },
  button: {
    background: "#1E52CC",
    color: "#fff",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
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
  icon: { cursor: "pointer", paddingTop: "5px" },
  datePicker: {
    border: "1px solid black",
    width: ({ customWidth }: { customWidth: string }) => customWidth,
    height: "28px",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px",
    cursor: "pointer",
    "& .MuiSvgIcon-root": {
      color: "#656565",
    },
  },
  dateLabel: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "6%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
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
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("today");
  const [visibleDate, setVisibleDate] = useState("Today");

  useEffect(() => {
    const date = new Date();
    const [startDate, endDate] = [new Date(date), new Date(date)];
    endDate.setHours(23, 59, 59);
    startDate.setHours(0, 0, 0, 0);
    setTempDateRange([
      {
        startDate,
        endDate,
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
    setVisibleDate("Quick Filters");
  };
  const handlePresetChange = (event: SelectChangeEvent) => {
    setSelectedPreset(event.target.value);
    handlePresetClick(event.target.value);
  };

  const handleOK = async () => {
    onDateRangeChange(tempDateRange);
    setShowDateRangePicker(false);
  };

  return (
    <Box className={classes.datePicker}>
      <Box className={classes.dateLabel}>
        <Typography>{visibleDate}</Typography>
        <InsertInvitationIcon
          onClick={() => setShowDateRangePicker((prev) => !prev)}
        />
      </Box>
      {showDateRangePicker && (
        <div className={classes.dateRangePickerContent}>
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
          <DateRange
            editableDateInputs
            onChange={handleSelect}
            moveRangeOnFirstSelection
            ranges={tempDateRange}
            className={classes.dateRange}
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              onClick={() => setShowDateRangePicker(false)}
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
          </div>
        </div>
      )}
    </Box>
  );
};
export default DatePicker;
