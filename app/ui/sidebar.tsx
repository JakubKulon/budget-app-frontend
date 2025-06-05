"use client";

import { useState } from "react";
import { Button } from "./button";
import { Modal } from "./modal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BudgetApiQuery } from "@/app/utils/apiQuery";
import { AddEntryForm, AddEntryFormData } from "./add-entry-form";

export function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const addEntryMutation = useMutation({
    mutationFn: BudgetApiQuery.addEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      setIsModalOpen(false);
      addEntryMutation.reset();
    },
    onError: (error) => {
      console.error("Error adding entry:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    },
  });

  const handleAddEntryAction = (data: AddEntryFormData) => {
    addEntryMutation.mutate(data);
  };

  const handleCancelAction = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <aside className="min-w-2xs">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add entry
        </Button>
      </aside>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Entry"
      >
        <AddEntryForm
          onSubmitAction={handleAddEntryAction}
          onCancelAction={handleCancelAction}
          isLoading={addEntryMutation.isPending}
          error={
            addEntryMutation.error instanceof Error
              ? addEntryMutation.error.message
              : addEntryMutation.error
                ? String(addEntryMutation.error)
                : undefined
          }
        />
      </Modal>
    </>
  );
}
