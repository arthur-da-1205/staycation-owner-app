export interface FilterInput {
  field: any;
  operator: any;
}

export interface PageInput {
  page: number;
  per_page: number;
}

export interface SortInput {
  direction: string[];
  field: string[];
}

export interface IPaging {
  page: number;
  per_page: number;
  total_count: number;
  page_count: number;
}
