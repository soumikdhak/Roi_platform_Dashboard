import type { IUser } from "./IUserSliceInitialState.interface"

export interface IResultData{
    statusCode:number,
    data:IUser
    message:string,
    success:boolean
}