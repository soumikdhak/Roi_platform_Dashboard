export interface IRoiHistory {
  userCode: string;
  investmentCode: string;
  roiCode: string;
  amount: number;
  date: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPagination {
  page: number;
  limit: number;
  count: number;
  Total: number;
  totalPages: number;
}

export interface IRoiHistoryInitailState {
  error: null | string ;
  loading: boolean;
  status: null | number;
  pagination: IPagination | null;
  roiHistory: IRoiHistory[] | null;
}
