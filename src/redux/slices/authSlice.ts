import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import toast from "react-hot-toast";
import type { IUserSliceInitialState } from "../../interfaces/IUserSliceInitialState.interface";
import type { IFormData } from "../../interfaces/IFormData.interface";
import { AxiosError } from "axios";

export const registerUser = createAsyncThunk(
    'users/register',
    async (data:IFormData, thunkAPI) => {
        try {
            const response =await axiosInstance.post("/users/register",data);
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

export const loginUser = createAsyncThunk(
    'users/login',
    async(data:IFormData, thunkAPI) => {
        try {
            const response =await axiosInstance.post('/users/login',data);
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

export const logoutUser = createAsyncThunk(
    'users/logout',
    async(_,thunkAPI) => {
        try {
            const response =await axiosInstance.post('users/logout');
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

export const FetchDashboardData = createAsyncThunk(
    'users/dashboard',
    async(_,thunkAPI) => {
        try {
            const response =await axiosInstance.get('users/dashboard');
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

export const FetchChartData = createAsyncThunk(
    'users/chartData',
    async(_,thunkAPI) => {
        try {
            const response =await axiosInstance.get('users/chartData');
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

const userFromStorage = localStorage.getItem('user');
const dashboardDataFromStorage = localStorage.getItem('dashoard')

const initialState:IUserSliceInitialState = {
  user:userFromStorage ? JSON.parse(userFromStorage) : null,
  chart:null,
  dashboard:dashboardDataFromStorage?JSON.parse(dashboardDataFromStorage):null,
  status:null,
  loading: false,
  error:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user=action.payload.data;
                localStorage.setItem('user', JSON.stringify(state.user))
                state.status=action.payload.statusCode
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error=(action.payload as string) || 'Error while creating User'
            })
            .addCase(loginUser.pending, (state) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                //console.log(action.payload)
                state.user=action.payload.data
                localStorage.setItem('user', JSON.stringify(state.user))
                state.status=action.payload.statusCode
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error=(action.payload as string) || 'Error while logging in User'
            })
            .addCase(logoutUser.pending, (state) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user=null;
                state.status=action.payload.statusCode
                localStorage.removeItem('user');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error=(action.payload as string) || 'Error while logging out User'
            })
            .addCase(FetchDashboardData.pending, (state) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(FetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard=action.payload.data;
                localStorage.setItem('dashboard',JSON.stringify(state.dashboard));
                state.status=action.payload.statusCode
            })
            .addCase(FetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error=(action.payload as string) || 'Error while fetching dashboard data'
            })
            .addCase(FetchChartData.pending, (state) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(FetchChartData.fulfilled, (state, action) => {
                state.loading = false;
                state.chart=action.payload.data;
                state.status=action.payload.statusCode
            })
            .addCase(FetchChartData.rejected, (state, action) => {
                state.loading = false;
                state.error=(action.payload as string) || 'Error while fetching dashboard data'
            })
    }
})

export default authSlice;