"use client";

import { useState } from "react";
import { Occurrence } from "@/types/api";
import { Button } from "../button";

export type AddEntryFormData = {
  name: string;
  value: number;
  category?: string;
  occurrence?: keyof typeof Occurrence;
};

interface AddEntryFormProps {
  onSubmitAction: (data: AddEntryFormData) => void;
  onCancelAction: () => void;
  isLoading?: boolean;
  error?: string;
}

export function AddEntryForm({
  onSubmitAction,
  onCancelAction,
  isLoading = false,
  error,
}: AddEntryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    value: 0,
    category: "",
    occurrence: "" as keyof typeof Occurrence | "",
  });

  const [errors, setErrors] = useState({
    name: "",
    value: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      value: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.value <= 0) {
      newErrors.value = "Value must be greater than 0";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("🎯 FORM SUBMIT HANDLER CALLED!");
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }

    const submitData: AddEntryFormData = {
      name: formData.name,
      value: formData.value,
      category: formData.category || undefined,
      occurrence: formData.occurrence || undefined,
    };

    onSubmitAction(submitData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Enter entry name"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Value Field */}
      <div>
        <label
          htmlFor="value"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Value (zł) *
        </label>
        <input
          id="value"
          name="value"
          type="number"
          value={formData.value}
          onChange={(e) => handleInputChange("value", Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="0.00"
          step="0.01"
          min="0"
          disabled={isLoading}
        />
        {errors.value && (
          <p className="mt-1 text-sm text-red-600">{errors.value}</p>
        )}
      </div>

      {/* Category Field */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Enter category (optional)"
          disabled={isLoading}
        />
      </div>

      {/* Occurrence Field */}
      <div>
        <label
          htmlFor="occurrence"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Occurrence
        </label>
        <select
          id="occurrence"
          name="occurrence"
          value={formData.occurrence}
          onChange={(e) =>
            handleInputChange(
              "occurrence",
              e.target.value as keyof typeof Occurrence,
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          disabled={isLoading}
        >
          <option value="">Select occurrence (optional)</option>
          <option value="per_month">Per Month</option>
          <option value="per_2_months">Per 2 Months</option>
          <option value="per_year">Per Year</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add Entry"}
        </Button>
        <Button
          type="button"
          onClick={onCancelAction}
          disabled={isLoading}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
