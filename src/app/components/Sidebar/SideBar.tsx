"use client";

import React, { useState, useEffect } from "react";
import { LiaFilterSolid } from "react-icons/lia";

interface SidebarProps {
  onFilterChange: (filters: {
    gender: string | null;
    status: string | null;
  }) => void;
  currentFilters: { gender: string | null; status: string | null };
  open: boolean;
  onOpenChange: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onFilterChange,
  currentFilters,
  open,
  onOpenChange,
}) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(
    currentFilters.gender
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    currentFilters.status
  );

  useEffect(() => {
    setSelectedGender(currentFilters.gender);
    setSelectedStatus(currentFilters.status);
  }, [currentFilters]);

  const handleGender = (gender: string) => {
    const newGender = selectedGender === gender ? null : gender;
    setSelectedGender(newGender);
    onFilterChange({ gender: newGender, status: selectedStatus });
  };

  const handleStatus = (status: string) => {
    const newStatus = selectedStatus === status ? null : status;
    setSelectedStatus(newStatus);
    onFilterChange({ gender: selectedGender, status: newStatus });
  };

  const renderButton = (
    label: string,
    selectedItem: string | null,
    handler: (item: string) => void
  ) => (
    <button
      className={`flex items-center justify-center rounded-3xl px-2 py-1 ${
        selectedItem === label
          ? "bg-orange-500 text-white"
          : "bg-slate-300 text-gray-900"
      } hover:bg-orange-500 hover:text-white`}
      onClick={() => handler(label)}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`w-full h-min left-0 sm:w-[300px] flex flex-col text-white bg-gray-800 p-5 rounded-e-md cursor-pointer transition-all ${
        open ? "h-min sm:min-h-screen" : ""
      }`}
    >
      <div className="flex justify-center gap-2" onClick={onOpenChange}>
        <div>Filters</div>
        <LiaFilterSolid size={25} />
      </div>
      {open && (
        <>
          <div className="text-lg md:text-2xl text-gray-400 font-semibold mb-1">
            Gender
          </div>
          <div className="flex justify-start gap-2 flex-wrap">
            {renderButton("Female", selectedGender, handleGender)}
            {renderButton("Male", selectedGender, handleGender)}
            {renderButton("Genderless", selectedGender, handleGender)}
            {renderButton("unknown", selectedGender, handleGender)}
          </div>
          <div className="text-lg md:text-2xl text-gray-400 font-semibold mb-1 mt-4">
            Status
          </div>
          <div className="flex justify-start gap-2 flex-wrap">
            {renderButton("Alive", selectedStatus, handleStatus)}
            {renderButton("Dead", selectedStatus, handleStatus)}
            {renderButton("unknown", selectedStatus, handleStatus)}
          </div>
        </>
      )}
    </div>
  );
};
