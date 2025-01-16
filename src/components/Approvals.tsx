import { get } from "lodash";
import type { DonationData } from "../types/donations";
import StyledDatagrid from "./StyledDatagrid";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const columns = [
  {
    id: "requestId",
    field: "requestId",
    numeric: false,
    disablePadding: false,
    headerName: "Request ID",
    disableColumnMenu: true,
    flex: 1,
  },
  {
    id: "donatingUser",
    field: "donatingUser",
    numeric: false,
    disablePadding: false,
    headerName: "Donating User",
    disableColumnMenu: true,
    flex: 1,
  },
  {
    id: "quantity",
    field: "quantity",
    numeric: true,
    disablePadding: false,
    headerName: "Quantity",
    disableColumnMenu: true,
    flex: 1,
  },
  {
    id: "time",
    field: "time",
    numeric: false,
    disablePadding: false,
    headerName: "Time Available",
    disableColumnMenu: true,
    flex: 1,
  },
  {
    id: "type",
    field: "type",
    numeric: false,
    disablePadding: false,
    headerName: "Type of Product",
    disableColumnMenu: true,
    flex: 1,
  },
  {
    id: "approve",
    field: "approve",
    numeric: false,
    disablePadding: false,
    headerName: "Approve Donation",
    disableColumnMenu: true,
    flex: 1,
    renderCell: ({ row }: DonationData) => (
      <IconButton onClick={() => console.log(get(row, "requestId", ""))}>
        <DoneAllIcon />
      </IconButton>
    ),
  },
];

const Approvals = () => {
  return (
    <>
      <StyledDatagrid columns={columns} />
    </>
  );
};

export default Approvals;
