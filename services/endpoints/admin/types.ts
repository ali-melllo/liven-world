export interface AdminAttributesResponse {

  user: {
    _id:string;
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

