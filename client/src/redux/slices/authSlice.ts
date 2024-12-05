import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface authInitialState {
  status: string;
  userInfo:
    | {
        uid: string;
        name: string;
        email: string;
      }
    | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: authInitialState = {
  status: "idle",
  userInfo: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getUser = createAsyncThunk("get_user", async () => {
//   try {
//     let response;
//     if (query) {
//       response = await ApiHelperFunction({
//         urlPath: `/blogs?populate=deep&${query}`,
//         method: "GET",
//       } as ApiFuncArgProps);
//     } else {
//       response = await ApiHelperFunction({
//         urlPath: "/blogs?populate=deep",
//         method: "GET",
//       } as ApiFuncArgProps);
//     }

//     if (isApiErrorResponse(response)) {
//       console.log("Error: ", response.error.message);
//     } else {
//       return response;
//     }
//   } catch (error: any) {
//     console.log("Failed to fetch blogs due to ", error.message);
//   }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.status = "idle";
      state.userInfo = undefined;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.isSuccess = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = "failed";
        state.isError = true;
      });
  },
});

export const { clearAuthState, setUser } = authSlice.actions;
