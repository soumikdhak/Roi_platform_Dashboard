export interface IInvestment{
    refUserCode:string,
    investmentCode:string,
    amount:number,
    planDetails:string,
    startDate:string,
    endDate:string,
    dailyROIPercent:number,
    status:string,
    createdAt:Date,
    updatedAt:Date
}

export interface IInvestmentSliceInitialState{
    error:null | string,
    loading:boolean
    status:null | number
    count:null |number
    balance: null | number
    investments: null | IInvestment[]
    lastCreatedInvestment: null | IInvestment 

}