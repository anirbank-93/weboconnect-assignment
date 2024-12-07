import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Helpers
import { ApiHelperFunction } from "@/helpers/api_helpers";
import { isApiErrorResponse } from "@/helpers/typeguards";

// Models
import { ApiFuncArgProps } from "@/models/apiFuncHelpers";
import { PostListDataModel } from "@/models/constants/dataModel";

interface PostInitialState {
  status: string;
  posts: PostListDataModel;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: PostInitialState = {
  status: "idle",
  posts: {
    data: [],
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllPosts = createAsyncThunk(
  "get_all_posts",
  async (query?: string) => {
    try {
      let response;
      if (query) {
        response = await ApiHelperFunction({
          urlPath: `/posts?q=${query}`,
          method: "GET",
        } as ApiFuncArgProps);
      } else {
        response = await ApiHelperFunction({
          urlPath: "/posts",
          method: "GET",
        } as ApiFuncArgProps);
      }

      if (isApiErrorResponse(response)) {
        console.log("Error: ", response.error.message);
      } else {
        return response;
      }
    } catch (error: any) {
      console.log("Failed to fetch posts due to ", error.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostState: (state) => {
      state.status = "idle";
      state.posts = {
        data: [],
      };
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.isSuccess = true;
        state.posts = payload?.data;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.status = "failed";
        state.isError = true;
      });
  },
});

export const { clearPostState } = postSlice.actions;
