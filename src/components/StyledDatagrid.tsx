import { FC, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const useStyles = makeStyles({
  body: {
    margin: "5vh 2vw",
    padding: "7vh 0 0 0",
    border: "1px solid #00000033",
    "& .MuiDataGrid-root": { borderStyle: "none" },
    "& .MuiDataGrid-columnSeparator": { color: "white !important" },
    "& .MuiDataGrid-cell:focus": { outline: "none !important" },
    "& .MuiDataGrid-columnHeader:focus": { outline: "none !important" },
    "& .MuiDataGrid-row.Mui-selected": { backgroundColor: "white !important" },
    "& .MuiDataGrid-columnHeaderTitle": { fontSize: "18px" },
  },
  dateLabel: {
    width: "85%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
});

type Props = { columns: GridColDef[] };

const StyledDatagrid: FC<Props> = ({ columns }: Props) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [visibleDate, setVisibleDate] = useState("Today");

  return (
    <>
      <Card className={classes.body}>
        <Box>
          <Box>
            <Typography className={classes.dateLabel}>{visibleDate}</Typography>
          </Box>
          <Box></Box>
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
