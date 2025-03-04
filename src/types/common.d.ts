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

export type RegisterProps = {
  registerUser: (user: UserData) => void;
  error: string;
  successMessage: string;
  resetMessage: VoidFunction;
};

export type LoginDetails = { userMail: string; password: string };

export type LoginProps = {
  loginUser: (loginDetails: LoginDetails) => void;
  error: string;
  successMessage: string;
  resetMessage: VoidFunction;
  userCred: { userName: string; email: string };
};

export type AlertProps = {
  resetMessage: VoidFunction;
  message: string;
  type: "error" | "success";
};
