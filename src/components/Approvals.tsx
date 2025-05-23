import { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import isEmpty from "lodash/isEmpty";
import StyledDatagrid from "./styledComponents/StyledDatagrid";
import TimedAlert from "./styledComponents/TimedAlert";
import { RootState } from "../apis/rootReducer";
import {
  approvalCountSelector,
  approvalsSelector,
  errorMessageSelector,
  requesterDetailSelector,
  successMessageSelector,
} from "../selectors/approvalSelectors";
import type {
  ApprovalProps,
  DateRangeType,
  DonationData,
} from "../types/common";
import approvalActions from "../actions/approvalActions";
import StyledDialog from "./styledComponents/StyledDialog";
import { StyledInputBox } from "./styledComponents/LabeledInputs";

const Approvals: FC<ApprovalProps> = ({
  resetMessage,
  error,
  successMessage,
  approvalRequests,
  requesterDetail,
  fetchApprovals,
  fetchRequester,
  approveDonationRequests,
  approvalCount,
}) => {
  const { userName, email, location, mobile } = requesterDetail;
  const [selectedRequest, setSelectedRequest] = useState<string | false>(false);
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
      id: "requestedBy",
      field: "requestedBy",
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
      id: "productType",
      field: "productType",
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
        <IconButton
          onClick={() => {
            fetchRequester(row.id);
            setSelectedRequest(row.id);
          }}
        >
          <PreviewRoundedIcon fontSize="large" />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchApprovals();
  }, []);

  const renderContent = () => (
    <>
      <Box>
        <StyledInputBox width={"17vw"}>
          <Typography variant="h6">Name</Typography>
          <Typography variant="body2">{userName}</Typography>
        </StyledInputBox>
        <StyledInputBox width={"7vw"}>
          <Typography variant="h6">mobile</Typography>
          <Typography variant="body2">{mobile}</Typography>
        </StyledInputBox>
      </Box>
      <Box>
        <StyledInputBox width={"17vw"}>
          <Typography variant="h6">Email</Typography>
          <Typography variant="body2">{email}</Typography>
        </StyledInputBox>
        <StyledInputBox width={"7vw"}>
          <Typography variant="h6">Location</Typography>
          <Typography variant="body2">{location}</Typography>
        </StyledInputBox>
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
      <StyledDialog
        dialogOpen={!isEmpty(selectedRequest)}
        setDialogOpen={(_value: boolean) => setSelectedRequest("")}
        dialogContent={renderContent}
        dialogHeader="Requester's Details"
        onSubmit={() =>
          approveDonationRequests(selectedRequest as string, true)
        }
        onCancel={() =>
          approveDonationRequests(selectedRequest as string, false)
        }
        submitLabel="Approve"
        cancelLabel="Reject"
      />
      <StyledDatagrid
        columns={columns}
        rows={approvalRequests as []}
        onFetch={fetchApprovals}
        totalDataCount={approvalCount}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
  approvalRequests: approvalsSelector(state),
  requesterDetail: requesterDetailSelector(state),
  approvalCount: approvalCountSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetMessage: () => dispatch(approvalActions.resetMessage()),
  fetchApprovals: (
    search?: string,
    page?: number,
    pageSize?: number,
    dateRange?: DateRangeType,
    quantity?: number[]
  ) =>
    dispatch(
      approvalActions.fetchApprovals(
        search,
        page,
        pageSize,
        dateRange,
        quantity
      )
    ),
  fetchRequester: (reqId: string) =>
    dispatch(approvalActions.fetchRequesterDetails(reqId)),
  approveDonationRequests: (reqId: string, isApproval: boolean) =>
    dispatch(approvalActions.approveDonationRequests(reqId, isApproval)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Approvals);
