import { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import get from "lodash/get";
import StyledDatagrid from "./styledComponents/StyledDatagrid";
import TimedAlert from "./styledComponents/TimedAlert";
import { RootState } from "../apis/rootReducer";
import {
  approvalsSelector,
  errorMessageSelector,
  requesterDetailSelector,
  successMessageSelector,
} from "../selectors/approvalSelectors";
import type { ApprovalProps, DonationData } from "../types/common";
import approvalActions from "../actions/approvalActions";

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
    id: "requestingUser",
    field: "requestingUser",
    numeric: false,
    disablePadding: false,
    headerName: "Requesting User",
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

const Approvals: FC<ApprovalProps> = ({
  resetMessage,
  error,
  successMessage,
  approvalRequests,
  requesterDetail,
  fetchApprovals,
  fetchRequester,
  approveDonationRequests,
}) => {
  useEffect(() => {
    fetchApprovals();
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
        rows={approvalRequests as []}
        onFetch={fetchApprovals}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
  approvalRequests: approvalsSelector(state),
  requesterDetail: requesterDetailSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetMessage: () => dispatch(approvalActions.resetMessage()),
  fetchApprovals: () => dispatch(approvalActions.fetchApprovals()),
  fetchRequester: (reqId: number) =>
    dispatch(approvalActions.fetchRequesterDetails(reqId)),
  approveDonationRequests: (reqId: number) =>
    dispatch(approvalActions.approveDonationRequests(reqId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Approvals);
