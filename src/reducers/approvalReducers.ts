import get from "lodash/get";
import { ApprovementTypes } from "../actions/actionTypes";
import type {
  ApprovalSuccessAction,
  CommonReducerType,
  SuccessFetchRequestAction,
} from "../types/common";

interface ApprovalReducerType {
  approvalData: ApprovalSuccessAction["approvalData"][];
  requesterData: SuccessFetchRequestAction["requesterData"];
}

const initialState: ApprovalReducerType & CommonReducerType = {
  successMessage: "",
  errorMessage: "",
  type: "",
  approvalData: [] as ApprovalSuccessAction["approvalData"][],
  requesterData: {} as SuccessFetchRequestAction["requesterData"],
};

export const approvalReducer = (
  state = initialState,
  action: ApprovalReducerType & CommonReducerType
) => {
  switch (action.type) {
    case ApprovementTypes.SUCCESS_APPROVE_DONATION_REQUESTS:
    case ApprovementTypes.SUCCESS_FETCH_REQUESTER_DETAILS:
    case ApprovementTypes.SUCCESS_FETCH_APPROVALS:
      return {
        ...state,
        successMessage: action.successMessage,
        approvalData: get(action, "approvalData", []),
        requesterData: get(action, "requesterData", {}),
      };
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
