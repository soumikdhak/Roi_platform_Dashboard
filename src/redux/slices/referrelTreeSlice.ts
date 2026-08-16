import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import toast from "react-hot-toast";
import type { IReferrelTree } from "../../interfaces/IReferrelTree.interface";
import { AxiosError } from "axios";

export const FetchDirectReferrelTree = createAsyncThunk(
    'users/fetchDirectReferral',
    async(_,thunkAPI) => {
        try {
            const response =await axiosInstance.get('users/fetchDirectReferral');
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            const message = err.response?.data?.message || "Something went wrong";
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchWholeReferrelTree = createAsyncThunk(
    'users/fetchReferralTree',
    async(_,thunkAPI) => {
        try {
            const response =await axiosInstance.get('users/fetchReferralTree');
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            const message = err.response?.data?.message || "Something went wrong";
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const directReferreldataFromStorage = localStorage.getItem('referrel');

const initialState: IReferrelTree= {
  fullReferrelTree: null,
  directReferreltree:directReferreldataFromStorage? JSON.parse(directReferreldataFromStorage): null,
  status: null,
  loading: false,
  error: null,
};

const referrelTreeSlice = createSlice({
  name: "roiHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchDirectReferrelTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchDirectReferrelTree.fulfilled, (state, action) => {
        state.loading = false;
        state.directReferreltree = action.payload.data;
        localStorage.setItem('directReferreltree', JSON.stringify(state.directReferreltree))
        state.status = action.payload.statusCode;
      })
      .addCase(FetchDirectReferrelTree.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string)  || 'Error while fetching data';
      })
      .addCase(fetchWholeReferrelTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWholeReferrelTree.fulfilled, (state, action) => {
        state.loading = false;
        state.fullReferrelTree = action.payload.data
        state.status = action.payload.statusCode;
      })
      .addCase(fetchWholeReferrelTree.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string)  || 'Error while fetching data';
      });
  },
});

export default referrelTreeSlice;