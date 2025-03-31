import { ApprovementTypes } from "./actionTypes";
import type {
  ApprovalSuccessAction,
  SuccessFetchRequestAction,
} from "../types/common";

const fetchApprovals = () => ({ type: ApprovementTypes.FETCH_APPROVALS });
const requestFetchApprovals = () => ({
  type: ApprovementTypes.REQUEST_FETCH_APPROVALS,
});
const successFetchApprovals = ({
  successMessage,
  approvalData,
}: ApprovalSuccessAction) => ({
  type: ApprovementTypes.SUCCESS_FETCH_APPROVALS,
  successMessage,
  approvalData,
});
const failureFetchApprovals = (errorMessage: string) => ({
  type: ApprovementTypes.FAILURE_FETCH_APPROVALS,
  errorMessage,
});

const fetchRequesterDetails = (reqId: number) => ({
  type: ApprovementTypes.FETCH_REQUESTER_DETAILS,
  reqId,
});
const requestFetchRequesterDetails = () => ({
  type: ApprovementTypes.REQUEST_FETCH_REQUESTER_DETAILS,
});
const successFetchRequesterDetails = ({
  successMessage,
  requesterData,
}: SuccessFetchRequestAction) => ({
  type: ApprovementTypes.SUCCESS_FETCH_REQUESTER_DETAILS,
  successMessage,
  requesterData,
});
const failureFetchRequesterDetails = (errorMessage: string) => ({
  type: ApprovementTypes.FAILURE_FETCH_REQUESTER_DETAILS,
  errorMessage,
});

const approveDonationRequests = (reqId: number) => ({
  type: ApprovementTypes.APPROVE_DONATION_REQUESTS,
  reqId,
});
const requestApproveDonationRequests = () => ({
  type: ApprovementTypes.REQUEST_APPROVE_DONATION_REQUESTS,
});
const successApproveDonationRequests = (successMessage: string) => ({
  type: ApprovementTypes.SUCCESS_APPROVE_DONATION_REQUESTS,
  successMessage,
});
const failureApproveDonationRequests = (errorMessage: string) => ({
  type: ApprovementTypes.FAILURE_APPROVE_DONATION_REQUESTS,
  errorMessage,
});

const resetMessage = () => ({ type: ApprovementTypes.RESET_MESSAGE });

const approvalActions = {
  fetchApprovals,
  requestFetchApprovals,
  successFetchApprovals,
  failureFetchApprovals,
  fetchRequesterDetails,
  requestFetchRequesterDetails,
  successFetchRequesterDetails,
  failureFetchRequesterDetails,
  approveDonationRequests,
  requestApproveDonationRequests,
  successApproveDonationRequests,
  failureApproveDonationRequests,
  resetMessage,
};

export default approvalActions;
