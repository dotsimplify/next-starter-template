import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  userAPI,
  UserResponse,
  loginInput,
  LoginResponse,
  ApiResponseWithMessage,
  SingleResultType,
  IGame,
  IPostResultData,
  IUpdateData,
} from "../endpoints/userAPI";
import axios from "axios";
import Cookies from "js-cookie";
import { appLoading, setMessage } from "./appSlice";
import { setAuthorizationToken } from "@/helper";
import { TableData } from "@/types";

// Define initial state type
interface UserState {
  userDetails: UserResponse; // Type for user details
  results: TableData[];
  games: IGame[];
  singleResult: SingleResultType;
  errorInLogin: string; // Type for error message
  isAuthenticated: Boolean;
}

const initialState: UserState = {
  userDetails: {} as UserResponse, // Initial empty user details
  errorInLogin: "", // Initial empty error message
  results: [],
  games: [],
  singleResult: {} as SingleResultType,
  isAuthenticated: false,
};

// async thunk request to get user details
export const userRequest = createAsyncThunk<
  UserResponse, // Return type of the async thunk
  void, // No argument needed for userRequest
  { rejectValue: string } // Additional properties for the async thunk
>("user/userRequest", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await userAPI.getuser();
    dispatch(getUserDetails(data));
    return data; // This data will be passed as resolved value
  } catch (error) {
    if (error) {
      dispatch(appLoading(false));
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
});

// async thunk request for login
export const loginRequest = createAsyncThunk<
  LoginResponse, // Return type of the async thunk
  loginInput, // Argument type for the thunk
  { rejectValue: string } // Additional properties for the async thunk
>("user/loginRequest", async (input, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appLoading(true));
    const data: LoginResponse = await userAPI.login(input);
    const tokenName = process.env.NEXT_PUBLIC_COOKIE as string;
    const refreshTokenName = process.env.NEXT_PUBLIC_REFRESH_COOKIE as string;
    Cookies.set(tokenName, data.accessToken);
    Cookies.set(refreshTokenName, data.refreshToken);
    setAuthorizationToken(data.accessToken);
    dispatch(setIsAuthenticated(true));
    dispatch(userRequest());
    dispatch(appLoading(false));
    return data; // Return data directly
  } catch (error) {
    dispatch(appLoading(false));
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      return rejectWithValue(errorMessage);
    } else {
      throw error;
    }
  }
});

// async thunk request for logout
export const logoutRequest = createAsyncThunk<
  void, // Return type of the async thunk
  void, // Argument type for the thunk
  { rejectValue: string } // Additional properties for the async thunk
>("user/logoutRequest", async (_, { dispatch, rejectWithValue }) => {
  try {
    const tokenName = process.env.NEXT_PUBLIC_COOKIE as string;
    const refreshTokenName = process.env.NEXT_PUBLIC_REFRESH_COOKIE as string;
    Cookies.remove(tokenName);
    Cookies.remove(refreshTokenName);
    setAuthorizationToken("");
    dispatch(getUserDetails({}));
    dispatch(setIsAuthenticated(false));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      return rejectWithValue(errorMessage);
    } else {
      throw error;
    }
  }
});

// async thunk request for login
export const postResultRequest = createAsyncThunk<
  { message: string }, // Return type of the async thunk
  IPostResultData, // Argument type for the thunk
  { rejectValue: string } // Additional properties for the async thunk
>("user/postResultRequest", async (input, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appLoading(true));
    const data = await userAPI.postResult(input);
    dispatch(setMessage(data.message));
    dispatch(appLoading(false));
    return data; // Return data directly
  } catch (error) {
    dispatch(appLoading(false));
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      return rejectWithValue(errorMessage);
    } else if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      throw error; // Handle non-Axios errors
    }
  }
});

// async thunk request to get results
export const getResultsRequest = createAsyncThunk<
  { results: TableData[] }, // Return type on success
  void, // No arguments
  {
    rejectValue: string;
  }
>("user/getResultsRequest", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appLoading(true));
    const data = await userAPI.fetchResults();
    dispatch(setResults(data.results));
    dispatch(appLoading(false));
    return data; // Return the data directly
  } catch (error) {
    dispatch(appLoading(false));
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      return rejectWithValue(errorMessage);
    } else if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      throw error; // Handle non-Axios errors
    }
  }
});

// async thunk request to get games
export const getGamesRequest = createAsyncThunk<
  IGame[], // Return type on success
  void, // No arguments
  {
    rejectValue: string;
  }
>("user/getGamesRequest", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appLoading(true));
    const data = await userAPI.getGames();
    dispatch(setGames(data));
    dispatch(appLoading(false));
    return data; // Return the data directly
  } catch (error) {
    dispatch(appLoading(false));
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      return rejectWithValue(errorMessage);
    } else if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      throw error; // Handle non-Axios errors
    }
  }
});

export const getSingleResultRequest = createAsyncThunk<
  SingleResultType,
  string, // idToDelete parameter type
  { rejectValue: string }
>(
  "results/getSingleResultRequest",
  async (idToDelete, { dispatch, rejectWithValue }) => {
    try {
      const result = await userAPI.getSingleResult(idToDelete);
      dispatch(setSingleResult(result));
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        return rejectWithValue(errorMessage);
      } else {
        throw error;
      }
    }
  }
);

export const updateResultRequest = createAsyncThunk<
  { message: string },
  IUpdateData, // details parameter type
  { rejectValue: string }
>(
  "results/updateResultRequest",
  async (details, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appLoading(true));
      const response = await userAPI.updateResult(details);
      dispatch(setMessage(response.message));
      dispatch(appLoading(false));
      return response;
    } catch (error) {
      dispatch(appLoading(false));
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        return rejectWithValue(errorMessage);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error; // Handle non-Axios errors
      }
    }
  }
);

export const deleteResultRequest = createAsyncThunk<
  { message: string },
  string, // idToDelete parameter type
  { rejectValue: string }
>(
  "results/deleteResultRequest",
  async (idToDelete, { dispatch, rejectWithValue }) => {
    try {
      const response = await userAPI.deleteResult(idToDelete);
      dispatch(setMessage(response.message));
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        return rejectWithValue(errorMessage);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error; // Handle non-Axios errors
      }
    }
  }
);
// Create user slice
export const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserDetails: (state, action: PayloadAction<UserResponse>) => {
      state.userDetails = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<Boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setResults: (state, action: PayloadAction<TableData[]>) => {
      state.results = action.payload;
    },
    setGames: (state, action: PayloadAction<IGame[]>) => {
      state.games = action.payload;
    },
    setSingleResult: (state, action: PayloadAction<SingleResultType>) => {
      state.singleResult = action.payload;
    },
    clearLoginError: (state) => {
      state.errorInLogin = "";
    },
    setErrorMessage: (state, action) => {
      state.errorInLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRequest.rejected, (state, action) => {
      state.errorInLogin = action.payload as string;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.errorInLogin = action.payload as string;
    });
    builder.addCase(getResultsRequest.rejected, (state, action) => {
      state.errorInLogin = action.payload as string;
    });
    builder.addCase(getSingleResultRequest.rejected, (state, action) => {
      state.errorInLogin = action.payload as string;
    });
    builder.addCase(deleteResultRequest.rejected, (state, action) => {
      state.errorInLogin = action.payload as string;
    });
    builder.addCase(updateResultRequest.rejected, (state, action) => {
      state.errorInLogin = action.payload as string;
    });
    builder.addCase(postResultRequest.rejected, (state, action) => {
      state.errorInLogin = action.payload as string;
    });
  },
});

// Export actions and reducer
export const {
  getUserDetails,
  setIsAuthenticated,
  clearLoginError,
  setResults,
  setSingleResult,
  setGames,
  setErrorMessage,
} = adminSlice.actions;
export default adminSlice.reducer;
