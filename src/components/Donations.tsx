import { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Box, IconButton } from "@mui/material";
import get from "lodash/get";
import raiseRequestGif from "../assets/requestGif.gif";
import StyledDatagrid from "./styledComponents/StyledDatagrid";
import LabeledInputs from "./styledComponents/LabeledInputs";
import { RootState } from "../apis/rootReducer";
import {
  donationDataSelector,
  errorMessageSelector,
  successMessageSelector,
} from "../selectors/donationsSelector";
import donationActions from "../actions/donationActions";
import TimedAlert from "./styledComponents/TimedAlert";
import type {
  ApiDonationData,
  DonationData,
  DonationsProps,
} from "../types/common";

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
    id: "location",
    field: "location",
    numeric: true,
    disablePadding: false,
    headerName: "Location",
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

const Donations: FC<DonationsProps> = ({
  createDonation,
  successMessage,
  error,
  resetMessage,
  fetchAllDonations,
  donationData,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [productType, setProductType] = useState("");

  useEffect(() => {
    fetchAllDonations();
  }, []);

  const renderDialogContent = () => (
    <>
      <Box>
        <LabeledInputs
          label="Quantity"
          placeholder="Enter Quantity"
          type="number"
          value={quantity}
          onChange={(value) => setQuantity(Number(value))}
        />
        <LabeledInputs
          label="Location"
          placeholder="Enter location"
          value={location}
          onChange={(value) => setLocation(value)}
        />
      </Box>
      <Box>
        <LabeledInputs
          label="Time Availability"
          placeholder="Time"
          value={time}
          onChange={(value) => setTime(value)}
        />
        <LabeledInputs
          label="Product Type"
          placeholder="Product Type"
          value={productType}
          onChange={(value) => setProductType(value)}
        />
      </Box>
    </>
  );

  return (
    <>
      <TimedAlert resetMessage={resetMessage} message={error} type="error" />
      <TimedAlert
        resetMessage={resetMessage}
        message={successMessage}
        type="success"
      />
      <StyledDatagrid
        columns={columns}
        addRequests
        dialogContent={renderDialogContent}
        dialogHeader="Add Donation"
        onSubmit={() =>
          createDonation({ quantity, location, time, productType })
        }
      />
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
  donationData: donationDataSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createDonation: (donationData: ApiDonationData) =>
    dispatch(donationActions.addDonation(donationData)),
  fetchAllDonations: () => dispatch(donationActions.fetchDonationData()),
  resetMessage: () => dispatch(donationActions.resetMessage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Donations);
