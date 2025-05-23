import { ApprovementTypes } from "./actionTypes";
import type {
  DateRangeType,
  FetchedApprovalData,
  SuccessFetchRequestAction,
} from "../types/common";

const fetchApprovals = (
  search?: string,
  page?: number,
  pageSize?: number,
  dateRange?: DateRangeType,
  quantity?: number[]
) => ({
  type: ApprovementTypes.FETCH_APPROVALS,
  search,
  page,
  pageSize,
  dateRange,
  quantity,
});
const requestFetchApprovals = () => ({
  type: ApprovementTypes.REQUEST_FETCH_APPROVALS,
});
const successFetchApprovals = (
  successMessage: string,
  approvalData: FetchedApprovalData,
  approvalCount: number
) => ({
  type: ApprovementTypes.SUCCESS_FETCH_APPROVALS,
  successMessage,
  approvalData,
  approvalCount,
});
const failureFetchApprovals = (errorMessage: string) => ({
  type: ApprovementTypes.FAILURE_FETCH_APPROVALS,
  errorMessage,
});

const fetchRequesterDetails = (reqId: string) => ({
  type: ApprovementTypes.FETCH_REQUESTER_DETAILS,
  reqId,
});
const requestFetchRequesterDetails = () => ({
  type: ApprovementTypes.REQUEST_FETCH_REQUESTER_DETAILS,
});
const successFetchRequesterDetails = (
  requesterData: SuccessFetchRequestAction["requesterData"]
) => ({
  type: ApprovementTypes.SUCCESS_FETCH_REQUESTER_DETAILS,
  requesterData,
});
const failureFetchRequesterDetails = (errorMessage: string) => ({
  type: ApprovementTypes.FAILURE_FETCH_REQUESTER_DETAILS,
  errorMessage,
});

const approveDonationRequests = (reqId: string, isApproval: boolean) => ({
  type: ApprovementTypes.APPROVE_DONATION_REQUESTS,
  reqId,
  isApproval,
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
