import { api } from "../../../api/api";

export interface SignupDTO {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

export async function signup(data: SignupDTO) {
  const resp = await api.post('/auth/signup', data);
  return resp.data;
}