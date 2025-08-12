export interface ILogin {
  email: string;
  password: string;
}

export interface ISendOtp {
  email: string;
}

export interface IVerify {
  email: string;
  otp: string;
}
