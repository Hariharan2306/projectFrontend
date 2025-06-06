export type UserData = {
  userName: string;
  password: string;
  mobile: string;
  location: string;
  email: string;
  reciever: boolean;
  registeredId: string;
};

export interface AlertProps {
  error: string;
  successMessage: string;
  resetMessage: VoidFunction;
}
export interface RegisterProps extends AlertProps {
  registerUser: (user: UserData) => void;
}

export type LoginDetails = {
  userMail: string;
  password: string;
  isReciever: boolean;
};

export interface LoginProps extends AlertProps {
  loginUser: (loginDetails: LoginDetails) => void;
  userCred: { userName: string; email: string };
}

export type TimedAlertProps = {
  resetMessage: VoidFunction;
  message: string;
  type: "error" | "success";
};

export type ApiDonationData = {
  quantity: number;
  location: string;
  time: Date;
  productType: string;
  productDesc: string;
  onSuccess?: VoidFunction;
};

export type SagaProps = { type: string };

export type LoggedUserData = {
  userName: string;
  email: string;
  userType: "Reciever" | "Donor";
};

export type DonationData = {
  row: {
    donationId: string;
    donatingUser: string;
    quantity: number;
    time: Date;
    type: string;
    isAvailable: boolean;
    id: string;
  };
};

export type CommonReducerType = {
  successMessage: string;
  errorMessage?: string;
  error?: string;
  type: string;
};

export interface DonationsProps extends AlertProps {
  createDonation: (donationData: ApiDonationData) => void;
  fetchAllDonations: (
    search?: string,
    page?: number,
    pageSize?: number,
    dateRange?: DateRangeType,
    quantity?: number[]
  ) => void;
  donationData: DonationData["row"][];
  requestDonation: (requestingData: RequestingData) => void;
  donationCount: number;
  requestSuccess: string;
  requestError: string;
}

// used while request is fetched
export interface AllRequestData {
  quantity: number;
  location: string;
  time: string;
  productType: string;
  donor: string;
  requestId: string;
  id: string;
}

export interface RequestsProps extends AlertProps {
  fetchRequests: (
    search?: string,
    page?: number,
    pageSize?: number,
    dateRange?: DateRangeType,
    quantity?: number[]
  ) => void;
  allRequestData: AllRequestData[];
  withdrawRequests: (reqId: string) => void;
  requestsCount: number;
}

export interface SuccessFetchRequestAction {
  requesterData: {
    userName: string;
    email: string;
    location: string;
    mobile: string;
  };
}

export interface FetchedApprovalData {
  requestId: number;
  requestingUser: string;
  quantity: number;
  time: Date;
  type: string;
}

export interface ApprovalProps extends AlertProps {
  fetchApprovals: VoidFunction;
  approvalCount: number;
  fetchRequester: (requestId: string) => void;
  approveDonationRequests: (reqId: string, isApproval: boolean) => void;
  approvalRequests: FetchedApprovalData[];
  requesterDetail: SuccessFetchRequestAction["requesterData"];
}

export interface FetchApiProps {
  search?: string;
  page?: number;
  pageSize?: number;
  dateRange?: DateRangeType;
  quantity?: number[];
  activeToggle?: string;
}

export type DateRangeType = {
  startDate: Date;
  endDate: Date;
  key: "selection";
};

export type RequestingData = {
  donationId: string;
  quantity: number;
};

export type Option = {
  label: string;
  value: string;
};
