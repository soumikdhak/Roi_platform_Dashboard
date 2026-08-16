export interface IUser {
    fullName: string,
    email: string,
    userCode: string,
    mobileNumber: string,
    referralCode: string,
    referredBy: string
    walletBalance: number,
    totalROIEarned?: number,
    accountStatus: string
    totalLevelIncomeEarned?: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface IDashboard {
    fullName: string,
    email: string,
    userCode: string,
    accountStatus: string,
    totalROIEarned: number,
    walletBalance: number,
    totalLevelIncomeEarned: number,
    activeInvestments: number,
    totalInvestments: number,
    referralCode: string
}

export interface chartData {
    date: string,
    totalAmount: number

}

export interface IUserSliceInitialState {
    user: IUser | null,
    chart: null | chartData[]
    status: null | string
    loading: boolean
    error: string | null
    dashboard: null | IDashboard
}