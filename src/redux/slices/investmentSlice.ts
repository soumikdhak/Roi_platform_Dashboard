import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import toast from "react-hot-toast";
import type { IInvestmentSliceInitialState } from "../../interfaces/IInvestmentSliceInitialState.interface";
import type { IInvestmentData } from "../../interfaces/IInvestMentData";
import { AxiosError } from "axios";


export const createInvestment = createAsyncThunk(
    'investments/createInvestment', 
    async(data:IInvestmentData,thunkAPI) => {
        try {
            const response =await axiosInstance.post("investments/createInvestment",data);
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

export const fetchLoggedInUserInvestment = createAsyncThunk(
    'investments/getAllInvestments', 
    async(value:string,thunkAPI) => {
        try {
            const response =await axiosInstance.get(`investments/getAllInvestments?sort=${value}`);
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

const initialState:IInvestmentSliceInitialState = {
  lastCreatedInvestment:null,
  investments:null,
  balance:null,
  count:null,
  status:null,
  loading: false,
  error:null
}

const investmentSlice = createSlice({
    name:'investment',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
          .addCase(createInvestment.pending, (state) => {
            state.loading = true;
            state.error = null
          })
          .addCase(createInvestment.fulfilled, (state, action) => {
            state.loading = false;
            state.lastCreatedInvestment  = action.payload.data?.investment;
            state.balance = action.payload.data?.balance;
            state.status = action.payload.statusCode;
          })
          .addCase(createInvestment.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string)  || "Error while creating Investment";
          })
          .addCase(fetchLoggedInUserInvestment.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchLoggedInUserInvestment.fulfilled, (state, action) => {
            state.loading = false;
            //console.log(action.payload)
            state.investments = action.payload.data?.investments;
            state.count = action.payload.data?.count;
            state.status = action.payload.statusCode;
          })
          .addCase(fetchLoggedInUserInvestment.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as string)  || "Error while fetching investment";
          });
    }
})

export default investmentSlice;