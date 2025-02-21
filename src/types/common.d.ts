export type UserData = {
  userName: string;
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
  loginUser: LoginDetails;
};

export type RegisterProps = { registerUser: (user: UserData) => void };

export type LoginDetails = { userMail: string; password: string };

export type LoginProps = { loginUser: (loginDetails: LoginDetails) => void };
