import { apiResponse, EntryType } from "@/types/api";
import { AddEntryFormData } from "../ui/add-entry-form";

enum ApiRouteEnums {
  "delete-entry" = "/api/delete-entry",
  "create-entry" = "/api/create-entry",
  "entries" = "/api/entries",
}

export class BudgetApiQuery {
  private static async budgetApiHelper<TResponse = unknown, TBody = undefined>(
    route: string,
    method: RequestInit["method"] = "GET",
    body?: TBody,
  ): Promise<TResponse> {
    const config: RequestInit = {
      method: method,
    };

    if (body !== undefined) {
      config.headers = {
        "Content-Type": "application/json",
      };
      config.body = JSON.stringify(body);
    }

    const response = await fetch(route, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Failed to parse error response",
      }));

      throw errorData;
    }

    return response.json();
  }

  static async getEntries(): Promise<apiResponse<EntryType[]>> {
    return this.budgetApiHelper<apiResponse<EntryType[]>>(
      ApiRouteEnums.entries,
    );
  }

  static async addEntry(formData: AddEntryFormData) {
    return this.budgetApiHelper<unknown, AddEntryFormData>(
      ApiRouteEnums["create-entry"],
      "POST",
      formData,
    );
  }

  static async deleteEntry(id: EntryType["id"]) {
    return this.budgetApiHelper<unknown, { id: EntryType["id"] }>(
      ApiRouteEnums["delete-entry"],
      "DELETE",
      { id },
    );
  }
}
