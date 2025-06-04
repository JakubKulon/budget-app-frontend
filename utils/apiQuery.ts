import { apiResponse, EntryType } from "@/types/api";

export class BudgetApiQuery {
  static async getEntries(): Promise<apiResponse<EntryType[]>> {
    const response = await fetch("/api/entries");

    return response.json();
  }
}
