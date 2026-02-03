export type FormMode = "login" | "signup";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface LoginData {
  email: string;
  password: string;
}
