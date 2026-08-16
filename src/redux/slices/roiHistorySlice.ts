import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import toast from "react-hot-toast";
import type { IFilter } from "../../interfaces/IFilter.interface";
import type { IRoiHistoryInitailState } from "../../interfaces/IRoihistoryInitialState.interface";
import { AxiosError } from "axios";

export const fetchRoiHistoryofLoggedInUser = createAsyncThunk(
  "ROI/rois",
  async (filter:IFilter, thunkAPI) => {
    try {

      const params = new URLSearchParams();
      if (filter.sort) params.append('sort', filter.sort);
      if (filter.page) params.append('page', String(filter.page));
      if (filter.limit) params.append('limit', String(filter.limit));
      if (filter.date) params.append('date', filter.date);
      if (filter.investmentCode) params.append('roiCode', filter.investmentCode);

      const response = await axiosInstance.get(`ROI/rois?${params.toString()}`); 
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState:IRoiHistoryInitailState = {
  roiHistory: null,
  pagination: null,
  status: null,
  loading: false,
  error: null,
};

const roiHistorySlice = createSlice({
  name: "roiHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoiHistoryofLoggedInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoiHistoryofLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.roiHistory = action.payload.data?.roiHistory;
        state.pagination = action.payload.data?.pagination;
        state.status = action.payload.statusCode;
      })
      .addCase(fetchRoiHistoryofLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string)  || 'Error while fetching data';
      });
  },
});

export default roiHistorySlice;

