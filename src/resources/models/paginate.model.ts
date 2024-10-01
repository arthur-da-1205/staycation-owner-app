// Simple Pagination
export interface IPagingInfo {
  page: number;
  per_page: number;
  total_count: number;
  page_count: number;
}

export interface IPagingData<T> {
  items: T[];
  meta: IPagingInfo;
}

export interface IPagingResponse<T> {
  items: T[];
  meta: IPagingInfo | undefined;
  loading?: boolean;
  error?: string;
}
