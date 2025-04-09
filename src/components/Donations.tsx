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
  donationCountSelector,
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
  RequestData,
} from "../types/common";
import requestActions from "../actions/requestActions";

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
    field: "donor",
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
    field: "productType",
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
  requestDonation,
  donationCount,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState<Date>(new Date());
  const [productType, setProductType] = useState("");

  useEffect(() => {
    fetchAllDonations();
  }, [fetchAllDonations]);

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
          onChange={(value) => setTime(new Date(value))}
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

  const dialogData = {
    dialogContent: renderDialogContent,
    dialogHeader: "Add Donation",
    onSubmit: () =>
      createDonation({
        quantity,
        location,
        time,
        productType,
        onSuccess: fetchAllDonations,
      }),
  };

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
        dialogData={dialogData}
        rows={donationData as []}
        onFetch={fetchAllDonations}
        totalDataCount={donationCount}
      />
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
  donationData: donationDataSelector(state),
  donationCount: donationCountSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createDonation: (donationData: ApiDonationData) =>
    dispatch(donationActions.addDonation(donationData)),
  fetchAllDonations: (search?: string, page?: number, pageSize?: number) =>
    dispatch(donationActions.fetchDonationData(search, page, pageSize)),
  resetMessage: () => dispatch(donationActions.resetMessage()),
  requestDonation: (requestData: RequestData) =>
    dispatch(requestActions.createDonation(requestData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Donations);
