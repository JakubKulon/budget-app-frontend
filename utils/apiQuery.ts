import { apiResponse, EntryType } from "@/types/api";

export class BudgetApiQuery {
  static async getEntries(): Promise<apiResponse<EntryType[]>> {
    const response = await fetch("/api/entries");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Failed to parse error response",
      }));

      throw errorData;
    }

    return response.json();
  }
}
