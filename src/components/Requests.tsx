import { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import get from "lodash/get";
import StyledDatagrid from "./styledComponents/StyledDatagrid";
import { RootState } from "../apis/rootReducer";
import {
  donationRequestsDataSelector,
  errorMessageSelector,
  successMessageSelector,
} from "../selectors/donationRequestsSelector";
import requestActions from "../actions/requestActions";
import TimedAlert from "./styledComponents/TimedAlert";
import type { DonationData, RequestsProps } from "../types/common";

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
    id: "withdrawRequest",
    field: "withdrawRequest",
    numeric: false,
    disablePadding: false,
    headerName: "Withdraw Request",
    disableColumnMenu: true,
    flex: 1,
    renderCell: ({ row }: DonationData) => (
      <IconButton onClick={() => console.log(get(row, "requestId", ""))}>
        <DoneAllIcon />
      </IconButton>
    ),
  },
];

const Requests: FC<RequestsProps> = ({
  fetchRequests,
  resetMessage,
  successMessage,
  error,
  allRequestData,
  withdrawRequests,
}) => {
  useEffect(() => {
    fetchRequests();
  }, []);

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
        totalDataCount={0}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
  allRequestData: donationRequestsDataSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetMessage: () => dispatch(requestActions.resetMessage()),
  fetchRequests: () => dispatch(requestActions.fetchDonationRequests()),
  withdrawRequests: (reqId: number) =>
    dispatch(requestActions.withdrawDonationRequest(reqId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Requests);
