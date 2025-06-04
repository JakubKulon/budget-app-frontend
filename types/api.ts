export type apiResponse<T> = {
  success: boolean;
  data: T;
  length?: number;
};

export enum Occurrence {
  per_month = "per_month",
  per_2_months = "per_2_months",
  per_year = "per_year",
}

export type EntryType = {
  id: string;
  name: string;
  createDate: number;
  category?: string;
  value: number;
  occurrence?: keyof typeof Occurrence;
};

export type EditEntryType = {
  id: string;
  name: string;
  value: number;
  category?: string;
  occurrence?: keyof typeof Occurrence;
  createDate: number;
};
