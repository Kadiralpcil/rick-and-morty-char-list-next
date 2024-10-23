"use client";
import React, { useState, useEffect } from "react";

//Components
import CustomTable from "./components/CustomTable";
import Sidebar from "./components/Sidebar";

//Query
import { getAllCharacters } from "./api/characters";

//Types
import { Character } from "@/app/types";

export default function Home() {
  //States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState<Character[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<{
    gender: string | null;
    status: string | null;
  }>({
    gender: null,
    status: null,
  });

  //Effects
  // Effects
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const filteredFilters = {
        gender: filters.gender ?? undefined,
        status: filters.status ?? undefined,
      };
      const initialData = await getAllCharacters(
        currentPage,
        filteredFilters,
        search
      );

      if ("error" in initialData) {
        setError(initialData.error);
        setLoading(false);
        return;
      }

      setTotalCount(initialData.info.count);
      setData(initialData.results);
      setLoading(false);
    };

    fetchData();
  }, [currentPage, filters, search]);

  //Handlers
  const handleFilterChange = (newFilters: {
    gender: string | null;
    status: string | null;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredData = data.filter((character) => {
    const matchesGender = filters.gender
      ? character.gender === filters.gender
      : true;
    const matchesStatus = filters.status
      ? character.status === filters.status
      : true;
    return matchesGender && matchesStatus;
  });

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center sm:items-start sm:flex-row sm:gap-5"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Sidebar
        open={isSidebarOpen}
        onOpenChange={() => setIsSidebarOpen((prev) => !prev)}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />
      <div className="justify-center">
        <CustomTable
          loading={loading}
          totalCount={totalCount}
          data={filteredData}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          search={search}
          onSearchChange={(value: string) => {
            setSearch(value);
            setError("");
          }}
          error={error}
        />
      </div>
    </div>
  );
}
