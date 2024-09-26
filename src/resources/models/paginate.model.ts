// Cursor Pagination
export interface ICursorPagingData<T> {
  edges: {
    cursor: string;
    node: T[];
  };
  total_count: number;
  page_info: {
    has_next_page: string;
    start_cursor: string;
    has_previous_page: string;
    end_cursor: string;
  };
}

export interface ICursorPagingInfo {
  total_count: number;
  has_next_page: string;
  start_cursor: string;
  has_previous_page: string;
  end_cursor: string;
}

export interface ICursorPagingResponse<T> {
  data: T[];
  paging: ICursorPagingInfo | null;
  loading?: boolean;
  error?: string;
}

// Simple Pagination

export interface IPagingInfo {
  page: number;
  page_count: number;
  per_page: number;
  total_count: number;
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

// Extra

export type INode<T> = T & {
  cursor: string;
};
