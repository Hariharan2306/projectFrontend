import { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import raiseRequestGif from "../assets/requestGif.gif";
import HideSourceIcon from "@mui/icons-material/HideSource";
import StyledDatagrid from "./styledComponents/StyledDatagrid";
import LabeledInputs from "./styledComponents/LabeledInputs";
import { RootState } from "../apis/rootReducer";
import {
  donationCountSelector,
  donationDataSelector,
  errorMessageSelector,
  successMessageSelector,
} from "../selectors/donationsSelector";
import {
  successMessageSelector as requestSuccessSelector,
  errorMessageSelector as requestErrorSelector,
} from "../selectors/donationRequestsSelector";
import donationActions from "../actions/donationActions";
import TimedAlert from "./styledComponents/TimedAlert";
import type {
  ApiDonationData,
  DateRangeType,
  DonationData,
  DonationsProps,
  LoggedUserData,
  Option,
  RequestingData,
} from "../types/common";
import requestActions from "../actions/requestActions";
import StyledDialog from "./styledComponents/StyledDialog";
import { PRODUCT_TYPES } from "../config/constants";

export const StyledAutocompleteBox = styled(Box)(() => ({
  alignSelf: "center",
  "& .MuiOutlinedInput-root": {
    padding: "5px 0 !important",
    width: "18vw",
  },
}));

const Donations: FC<DonationsProps> = ({
  createDonation,
  successMessage,
  error,
  requestSuccess,
  requestError,
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
  const [productDesc, setProductDesc] = useState("");
  // to find which donation is selected and its quantity
  const [selectedRequestData, setSelectedRequestData] =
    useState<RequestingData>({} as RequestingData);
  const [requestingQty, setRequestingQty] = useState(1);
  const [donorErr, setDonorErr] = useState("");

  const { userType }: LoggedUserData = JSON.parse(
    sessionStorage.getItem("loggedUserData") || "{}"
  );

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
      renderCell: ({ row }: DonationData) => {
        return userType === "Donor" ? (
          <HideSourceIcon
            onClick={() =>
              setDonorErr("Donors aren't eligible to claim Requests")
            }
          />
        ) : (
          <img
            style={{ cursor: "pointer" }}
            src={raiseRequestGif}
            alt="raise request GIF"
            onClick={() =>
              setSelectedRequestData({
                donationId: row.donationId,
                quantity: row.quantity,
              })
            }
            width={40}
            height={40}
          />
        );
      },
    },
  ];

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
        <StyledAutocompleteBox>
          <Autocomplete
            value={PRODUCT_TYPES.find(({ value }) => value === productType)}
            onChange={(_e, enteredInp: Option | null) =>
              setProductType(get(enteredInp, "value", ""))
            }
            inputValue={productType}
            onInputChange={(_e, newInput) => setProductType(newInput)}
            options={PRODUCT_TYPES}
            renderInput={(params) => (
              <>
                <Typography>Product Type</Typography>
                <TextField placeholder="Product Type" {...params} />
              </>
            )}
          />
        </StyledAutocompleteBox>
      </Box>
      <LabeledInputs
        label="Product Details"
        placeholder="Tell about your Product"
        value={productDesc}
        onChange={(value) => setProductDesc(value)}
        width="36vw"
        multiline
        rows={1}
      />
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
        productDesc,
        onSuccess: fetchAllDonations,
      }),
  };

  return (
    <>
      <TimedAlert
        resetMessage={() => setDonorErr("")}
        message={donorErr}
        type="error"
      />
      <TimedAlert
        resetMessage={resetMessage}
        message={error || requestError || donorErr}
        type="error"
      />
      <TimedAlert
        resetMessage={resetMessage}
        message={requestSuccess || successMessage}
        type="success"
      />
      <StyledDialog
        dialogOpen={!isEmpty(selectedRequestData)}
        setDialogOpen={(_value: boolean) =>
          setSelectedRequestData({} as RequestingData)
        }
        onSubmit={() =>
          requestDonation({
            donationId: selectedRequestData.donationId,
            quantity: requestingQty,
          })
        }
        dialogHeader="Claim Donation"
        dialogContent={() => (
          <LabeledInputs
            type="number"
            label="Quantity required"
            value={requestingQty}
            onChange={(value) => setRequestingQty(Number(value))}
            slotProps={{ input: { min: 1, max: selectedRequestData.quantity } }}
          />
        )}
      />
      <StyledDatagrid
        columns={columns}
        addRequests
        dialogData={dialogData}
        rows={donationData as []}
        onFetch={fetchAllDonations}
        totalDataCount={donationCount}
        toggleButtons={[
          { label: "All Data", value: "all" },
          { label: "My Data", value: "mine" },
        ]}
      />
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  requestSuccess: requestSuccessSelector(state),
  requestError: requestErrorSelector(state),
  error: errorMessageSelector(state),
  donationData: donationDataSelector(state),
  donationCount: donationCountSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createDonation: (donationData: ApiDonationData) =>
    dispatch(donationActions.addDonation(donationData)),
  fetchAllDonations: (
    search?: string,
    page?: number,
    pageSize?: number,
    dateRange?: DateRangeType,
    quantity?: number[],
    activeToggle?: string
  ) =>
    dispatch(
      donationActions.fetchDonationData(
        search,
        page,
        pageSize,
        dateRange,
        quantity,
        activeToggle
      )
    ),
  resetMessage: () => {
    dispatch(donationActions.resetMessage());
    dispatch(requestActions.resetMessage());
  },
  requestDonation: (requestingData: RequestingData) =>
    dispatch(requestActions.createDonationRequest(requestingData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Donations);
