import { BACKEND_URL } from "@/environments";
import axios from "axios";

const client = axios.create({
  baseURL: `${BACKEND_URL}/users`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 300,
  withCredentials: true,
});

interface GetMeResponse {
  data: {
    id: string;
    email: string;
    fullname: string;
    photoURL: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt?: Date;
    googleId?: string;
    facebookId?: string;
    twitterId?: string;
    locale: string;
  };
}

export async function getMe(): Promise<GetMeResponse["data"]> {
  const response = await client.get<GetMeResponse>("/me");
  return response.data.data;
}
