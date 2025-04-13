import { api } from "../../../api/api";

export interface SignininDTO {
  email: string;
  password: string;
}

export async function signin(data: SignininDTO) {
  const resp = await api.post('/auth/login', data);
  return resp.data;
}