import { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import get from "lodash/get";
import StyledDatagrid from "./styledComponents/StyledDatagrid";
import { RootState } from "../apis/rootReducer";
import {
  requestsDataSelector,
  errorMessageSelector,
  successMessageSelector,
  requestsCountSelector,
} from "../selectors/donationRequestsSelector";
import requestActions from "../actions/requestActions";
import TimedAlert from "./styledComponents/TimedAlert";
import type {
  DateRangeType,
  DonationData,
  RequestsProps,
} from "../types/common";

const Requests: FC<RequestsProps> = ({
  fetchRequests,
  resetMessage,
  successMessage,
  error,
  allRequestData,
  withdrawRequests,
  requestsCount,
}) => {
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
      id: "donor",
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
      id: "productType",
      field: "productType",
      numeric: false,
      disablePadding: false,
      headerName: "Type of Product",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      id: "withdrawRequest",
      field: "withdrawRequest",
      numeric: false,
      disablePadding: false,
      headerName: "Withdraw Request",
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: DonationData) => (
        <IconButton onClick={() => withdrawRequests(get(row, "requestId", ""))}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

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
        rows={allRequestData as []}
        onFetch={fetchRequests}
        totalDataCount={requestsCount}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
  allRequestData: requestsDataSelector(state),
  requestsCount: requestsCountSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetMessage: () => dispatch(requestActions.resetMessage()),
  fetchRequests: (
    search?: string,
    page?: number,
    pageSize?: number,
    dateRange?: DateRangeType,
    quantity?: number[]
  ) =>
    dispatch(
      requestActions.fetchDonationRequests(
        search,
        page,
        pageSize,
        dateRange,
        quantity
      )
    ),
  withdrawRequests: (reqId: string) =>
    dispatch(requestActions.withdrawDonationRequest(reqId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Requests);
