import { TableData, User } from "@/types";
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_LIVE_BASE_URL}`;

// Define types for the data used in API requests and responses
export type loginInput = {
  userId: string;
  password: string;
};

export interface UserResponse {
  [key: string]: any;
}

export interface ApiResponseWithMessage {
  message: string;
}

interface RefreshTokenType {
  rf_token: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ResultResponse = {
  gameName: string;
  result: string;
  resultDate: string;
  createdAt: string;
};

export interface SingleResultType extends ResultResponse {
  id: string;
  _id: string;
}

export interface IUpdateData {
  gameName: string;
  result: number;
  resultDate: string;
  id: string;
}

export interface IGame {
  _id: string;
  gameName: string;
  slug: string;
}

export interface IPostResultData {
  resultDate: string;
  gameName: string;
  result: number;
}

export const userAPI = {
  login: async (loginInput: loginInput): Promise<LoginResponse> =>
    axios
      .post(`${baseURL}/base/user-login`, loginInput)
      .then((res) => res.data),
  logout: async (): Promise<ApiResponseWithMessage> =>
    axios.get(`${baseURL}/logout`).then((res) => res.data),
  getuser: async (): Promise<User> =>
    axios.get(`${baseURL}/base/getuser`).then((res) => res.data),
  fetchNewTokens: async (token: RefreshTokenType): Promise<LoginResponse> =>
    axios
      .post(`${baseURL}/regenerate-refresh-token`, token)
      .then((res) => res.data),
  fetchResults: async (): Promise<{ results: TableData[] }> =>
    axios.get(`${baseURL}/api/v2/my-posted-results`).then((res) => res.data),
  getGames: async (): Promise<IGame[]> =>
    axios.get(`${baseURL}/api/v2/user-games`).then((res) => res.data),
  changePassword: async (data: {
    oldPassword: string;
    password: string;
  }): Promise<{ message: string }> =>
    axios
      .put(`${baseURL}/base/change-my-password`, data)
      .then((res) => res.data),
  postResult: async (
    dataToPost: IPostResultData
  ): Promise<ApiResponseWithMessage> =>
    axios
      .post(`${baseURL}/api/v2/publish-result`, dataToPost)
      .then((res) => res.data),
  updateResult: async (details: IUpdateData): Promise<{ message: string }> => {
    const { id, ...rest } = details;
    return axios
      .put(`${baseURL}/api/v2//update-result/${id}`, rest)
      .then((res) => res.data);
  },
  deleteResult: async (idToDelete: string): Promise<{ message: string }> =>
    axios
      .delete(`${baseURL}/api/v2/delete-single-result/${idToDelete}`)
      .then((res) => res.data),
  getSingleResult: async (idToDelete: string): Promise<SingleResultType> =>
    axios
      .get(`${baseURL}/api/v2/get-single-result/${idToDelete}`)
      .then((res) => res.data),
};
