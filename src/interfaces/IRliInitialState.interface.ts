import type { IPagination } from "./IRoihistoryInitialState.interface"

export interface IReferral{
    toUser:string,
    fromUser:string,
    roiCode:string
    amount:number,
    date:string,
    level:number,
    createdAt:Date,
    updatedAt:Date
}

export interface IRliInitialState{
  referralIncomes: null | IReferral[],
  pagination: null | IPagination,
  status: null | number,
  loading: boolean ,
  error: null | string,
}