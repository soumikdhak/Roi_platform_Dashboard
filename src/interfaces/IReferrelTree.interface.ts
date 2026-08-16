export interface IDirectReferreltree{
    "referredUserFullName": "Puja Banerjee",
    "referredUserEmail": "puja@gmail.com",
    "referredUserUserCode": "0004"
}

export interface IFullReferrelTree{
    fullName:string,
    userCode:string,
    referralTree:{
    fullName: string,
    email: string,
    userCode: string,
    level: number}[]
}

export interface IReferrelTree{
  fullReferrelTree: null | IFullReferrelTree,
  directReferreltree: null | IDirectReferreltree,
  status: null | number,
  loading: boolean,
  error: null | string,
}