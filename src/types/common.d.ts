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
  fetchAllDonations: (search?: string) => void;
  donationData: DonationData["row"][];
  requestDonation: (requestData: RequestData) => void;
}

// used while request is created
export interface RequestData {
  donationId: number;
}

// used while request is fetched
export interface AllRequestData {
  requestId: number;
  donatingUser: string;
  quantity: number;
  time: Date;
  productType: string;
}

export interface RequestsProps extends AlertProps {
  fetchRequests: VoidFunction;
  allRequestData: AllRequestData[];
  withdrawRequests: (reqId: number) => void;
}

export interface SuccessFetchRequestAction {
  successMessage: string;
  requesterData: {
    userName: string;
    email: string;
    location: string;
  };
}

export interface ApprovalSuccessAction {
  successMessage: string;
  approvalData: {
    requestId: number;
    requestingUser: string;
    quantity: number;
    time: Date;
    type: string;
  };
}

export interface ApprovalProps extends AlertProps {
  fetchApprovals: VoidFunction;
  fetchRequester: (requestId: number) => void;
  approveDonationRequests: (reqId: number) => void;
  approvalRequests: ApprovalSuccessAction["approvalData"][];
  requesterDetail: SuccessFetchRequestAction["requesterData"];
}
