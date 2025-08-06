import {
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { SearchRounded } from "@mui/icons-material";
import get from "lodash/get";
import debounce from "lodash/debounce";
import StyledDialog from "./StyledDialog";
import DatePicker from "./Datepicker";
import QuantityFilter from "./QuantityFilter";
import { DONATION_DATE_OPTIONS } from "../../config/constants";
import type { DateRangeType, Option } from "../../types/common";

const useStyles = makeStyles({
  body: {
    margin: "5vh 2vw",
    padding: "3vh 0 0 0",
    border: "1px solid #00000033",
    "& .MuiDataGrid-root": { borderStyle: "none" },
    "& .MuiDataGrid-columnSeparator": { color: "white !important" },
    "& .MuiDataGrid-cell:focus": { outline: "none !important" },
    "& .MuiDataGrid-columnHeader:focus": { outline: "none !important" },
    "& .MuiDataGrid-row.Mui-selected": { backgroundColor: "white !important" },
    "& .MuiDataGrid-columnHeaderTitle": { fontSize: "18px" },
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 1vw 1vh 1vw",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    width: ({ noAllData }: MakeStyleProps) => (noAllData ? "27%" : "38%"),
    "& .MuiToggleButton-root": {
      padding: "4px 8px",
      border: "solid black 1px",
      borderRadius: "3px",
    },
  },
  searchAndAdd: {
    display: "flex",
    width: ({ addRequests }: MakeStyleProps) => (addRequests ? "40%" : "35%"),
    alignItems: "center",
    justifyContent: "space-between",
    "& .MuiOutlinedInput-input": { padding: "9px 14px" },
    "& .MuiTextField-root": {
      width: ({ addRequests }: MakeStyleProps) => (addRequests ? "70%" : "80%"),
    },
  },
});

type MakeStyleProps = {
  addRequests: boolean;
  noAllData: boolean;
};

interface Props {
  columns: GridColDef[];
  addRequests?: boolean;
  rows: [];
  onFetch: (
    search?: string,
    page?: number,
    pageSize?: number,
    dateRange?: DateRangeType,
    quantity?: number[],
    activeToggle?: string
  ) => void;
  totalDataCount: number;
  dialogData?: {
    dialogContent: () => ReactNode;
    dialogHeader: string;
    onSubmit: VoidFunction;
  };
  toggleButtons?: Option[];
}

const StyledDatagrid: FC<Props> = ({
  columns,
  addRequests = false,
  dialogData,
  rows = [],
  onFetch,
  totalDataCount,
  toggleButtons = [],
}: Props) => {
  const { dialogContent, dialogHeader, onSubmit } = dialogData || {};
  const noAllData = ["/requests", "/approvals"].includes(
    window.location.pathname
  );
  const classes = useStyles({
    addRequests,
    noAllData,
  });
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [dateRange, setDateRange] = useState({} as DateRangeType);
  const [qtyRange, setQtyRange] = useState<number[]>([]);
  const [activeToggle, setActiveToggle] = useState(
    get(toggleButtons, "[0].value", "")
  );

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (value) => onFetch(value, 0, 5, dateRange, qtyRange, activeToggle),
        1000
      ),
    []
  );

  useEffect(() => {
    const date = new Date();
    const [startDate, endDate] = [new Date(date), new Date(date)];
    endDate.setHours(23, 59, 59);
    startDate.setHours(0, 0, 0, 0);
    setDateRange({
      startDate,
      endDate,
      key: "selection",
    });
  }, []);

  useEffect(() => {
    onFetch(search, page, pageSize, dateRange, qtyRange, activeToggle);
  }, [dateRange, qtyRange]);

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const changeToggle = (value: string) => {
    setActiveToggle(value);
    onFetch(search, page, pageSize, dateRange, qtyRange, value);
  };

  return (
    <>
      <Card className={classes.body}>
        {dialogData && (
          <StyledDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            dialogContent={dialogContent}
            dialogHeader={dialogHeader}
            onSubmit={onSubmit}
          />
        )}
        <Box className={classes.toolBar}>
          <Box className={classes.filters}>
            <DatePicker
              options={DONATION_DATE_OPTIONS}
              onDateRangeChange={(tempDateRange) =>
                setDateRange(get(tempDateRange, "0", {}) as DateRangeType)
              }
              customWidth={noAllData ? "53%" : "38%"}
            />
            <QuantityFilter
              onApply={(qtyRange: number[]) => setQtyRange(qtyRange)}
              customWidth={noAllData ? "33%" : "18%"}
            />
            {!noAllData && (
              <ToggleButtonGroup
                value={activeToggle}
                onChange={(_e, value) => changeToggle(value)}
                exclusive
              >
                {toggleButtons.map(({ label, value }) => (
                  <ToggleButton value={value}>{label}</ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          </Box>
          <Box className={classes.searchAndAdd}>
            <TextField
              id="search"
              onChange={searchChange}
              value={search}
              placeholder="Search"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {addRequests && (
              <Tooltip arrow title="Add New Donation">
                <Button variant="contained" onClick={() => setDialogOpen(true)}>
                  <AddIcon />
                </Button>
              </Tooltip>
            )}
            <Tooltip arrow title="Refresh">
              <Button
                variant="contained"
                onClick={() =>
                  onFetch(
                    search,
                    page,
                    pageSize,
                    dateRange,
                    qtyRange,
                    activeToggle
                  )
                }
              >
                <RefreshIcon />
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <DataGrid
          rows={rows}
          rowCount={totalDataCount}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          paginationMode="server"
          filterMode="server"
          pageSizeOptions={[5, 10, 25]}
          onPaginationModelChange={({ page, pageSize }) => {
            setPage(page);
            setPageSize(pageSize);
            onFetch(search, page, pageSize, dateRange, qtyRange, activeToggle);
          }}
          disableRowSelectionOnClick
        />
      </Card>
    </>
  );
};

export default StyledDatagrid;
