import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import roiHistorySlice from './slices/roiHistorySlice'
import referrelIncomeSlice from './slices/referrelIncomeSlice'
import investmentSlice from './slices/investmentSlice'
import referrelTreeSlice from './slices/referrelTreeSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice.reducer,
    rois:roiHistorySlice.reducer,
    rlis:referrelIncomeSlice.reducer,
    investment:investmentSlice.reducer,
    referreltree:referrelTreeSlice.reducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


