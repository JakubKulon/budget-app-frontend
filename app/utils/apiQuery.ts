import { apiResponse, EntryType } from "@/types/api";
import { AddEntryFormData } from "../ui/add-entry-form";

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

  static async addEntry(formData: AddEntryFormData) {
    const response = await fetch("/api/create-entry/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Failed to parse error response",
      }));

      throw errorData;
    }

    return await response.json();
  }

  static async deleteEntry(id: EntryType["id"]) {
    const response = await fetch("/api/delete-entry/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Failed to parse error response",
      }));

      throw errorData;
    }

    return await response.json();
  }
}
