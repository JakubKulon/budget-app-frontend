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
    console.log("📤 BudgetApiQuery.addEntry called with:", formData);

    try {
      console.log("🌐 Making fetch request to /api/create-entry");
      const response = await fetch("/api/create-entry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response.json(), "ERROR");
      }

      const result = await response.json();
      console.log("✅ API Success response:", result);
      return result;
    } catch (error) {
      console.error("💥 Network or other error in addEntry:", error);
      throw error;
    }
  }
}
