export type UserData = {
  userName: string;
  password: string;
  mobile: string;
  location: string;
  email: string;
  reciever: boolean;
  registeredId: string;
};

export type RegisterUserSagaProps = {
  type: string;
  userData: UserData;
};

export type LoginUserSagaProps = {
  type: string;
  loginDetails: LoginDetails;
};

export interface AlertProps {
  error: string;
  successMessage: string;
  resetMessage: VoidFunction;
}
export interface RegisterProps extends AlertProps {
  registerUser: (user: UserData) => void;
}

export type LoginDetails = { userMail: string; password: string };

export interface LoginProps extends AlertProps {
  loginUser: (loginDetails: LoginDetails) => void;
  userCred: { userName: string; email: string };
}

export type TimedAlertProps = {
  resetMessage: VoidFunction;
  message: string;
  type: "error" | "success";
};
