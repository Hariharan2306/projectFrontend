import { FC } from "react";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import raiseRequestGif from "../assets/requestGif.gif";
import get from "lodash/get";
import type { DonationData } from "../types/donations";
import StyledDatagrid from "./StyledDatagrid";

const useStyles = makeStyles({});

const columns = [
  {
    id: "donationId",
    field: "donationId",
    numeric: false,
    disablePadding: false,
    headerName: "Donation ID",
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
    id: "request",
    field: "request",
    numeric: false,
    disablePadding: false,
    headerName: "Claim Donation",
    disableColumnMenu: true,
    flex: 1,
    renderCell: ({ row }: DonationData) => (
      <IconButton onClick={() => console.log(get(row, "donationId", ""))}>
        <img src={raiseRequestGif} alt="raise request GIF" />
      </IconButton>
    ),
  },
];

const Donations: FC = () => {
  const classes = useStyles();

  return (
    <>
      <StyledDatagrid columns={columns} />
    </>
  );
};
export default Donations;
