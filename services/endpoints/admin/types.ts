export interface AdminAttributesResponse {

  user: {
    id: string;
    fullName: string;
    email: string;
    active?: boolean;
    phone?: string
  };
  token: string;

}

export interface AdminAttributesLoginParamsType {
  fullName?: string
  email: string
  phone?: string
  terms?: boolean
  otp: string;
}

export interface AdminUpdatePasswordParamsType {
  oldPassword: string;
  newPassword: string;
}

