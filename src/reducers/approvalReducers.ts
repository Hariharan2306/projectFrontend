import get from "lodash/get";
import { ApprovementTypes } from "../actions/actionTypes";
import type {
  CommonReducerType,
  FetchedApprovalData,
  SuccessFetchRequestAction,
} from "../types/common";

interface ApprovalReducerType {
  approvalData: FetchedApprovalData[];
  requesterData: SuccessFetchRequestAction["requesterData"];
}

const initialState: ApprovalReducerType & CommonReducerType = {
  successMessage: "",
  errorMessage: "",
  type: "",
  approvalData: [] as FetchedApprovalData[],
  requesterData: {} as SuccessFetchRequestAction["requesterData"],
};

export const approvalReducer = (
  state = initialState,
  action: ApprovalReducerType & CommonReducerType
) => {
  switch (action.type) {
    case ApprovementTypes.SUCCESS_APPROVE_DONATION_REQUESTS:
    case ApprovementTypes.SUCCESS_FETCH_APPROVALS:
      return {
        ...state,
        successMessage: action.successMessage,
        approvalData: get(action, "approvalData", []),
        approvalCount: get(action, "approvalCount", 0),
      };
    case ApprovementTypes.SUCCESS_FETCH_REQUESTER_DETAILS:
      return { ...state, requesterData: get(action, "requesterData", {}) };
    case ApprovementTypes.FAILURE_APPROVE_DONATION_REQUESTS:
    case ApprovementTypes.FAILURE_FETCH_APPROVALS:
    case ApprovementTypes.FAILURE_FETCH_REQUESTER_DETAILS:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case ApprovementTypes.RESET_MESSAGE:
      return { ...state, successMessage: "", errorMessage: "" };
    default:
      return state;
  }
};
export default approvalReducer;
