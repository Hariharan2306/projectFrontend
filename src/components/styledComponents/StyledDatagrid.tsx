import { ChangeEvent, FC, ReactNode, useState } from "react";
import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { SearchRounded } from "@mui/icons-material";
import { debounce } from "lodash";
import AddDonationDialog from "./StyledDialog";
import DatePicker from "./Datepicker";
import { DONATION_DATE_OPTIONS } from "../../config/constants";

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
  searchAndAdd: {
    display: "flex",
    justifyContent: ({ addRequests }: { addRequests: boolean }) =>
      addRequests ? "space-between" : "right",
    width: "30vw",
    alignItems: "center",
    "& .MuiOutlinedInput-input": { padding: "9px 14px" },
    "& .MuiTextField-root": { width: "80%" },
  },
});

type Props = {
  columns: GridColDef[];
  addRequests?: boolean;
  dialogContent?: () => ReactNode;
  dialogHeader?: string;
  onSubmit?: () => void;
};

const StyledDatagrid: FC<Props> = ({
  columns,
  addRequests = false,
  dialogContent,
  dialogHeader = "",
  onSubmit,
}: Props) => {
  const classes = useStyles({ addRequests });
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // debounce(() => api, 3000);
  };

  return (
    <>
      <Card className={classes.body}>
        {addRequests && (
          <AddDonationDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            dialogContent={dialogContent}
            dialogHeader={dialogHeader}
            onSubmit={onSubmit}
          />
        )}
        <Box className={classes.toolBar}>
          <DatePicker
            options={DONATION_DATE_OPTIONS}
            onDateRangeChange={(tempDateRange) => {
              console.log(tempDateRange);
            }}
          />
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
          </Box>
        </Box>
        <DataGrid
          columns={columns}
          rows={[]}
          pagination={true}
          paginationMode={"client"}
          filterMode={"client"}
          hideFooter={false}
        />
      </Card>
    </>
  );
};

export default StyledDatagrid;
