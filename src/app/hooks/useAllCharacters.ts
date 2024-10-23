import { useState, useEffect } from "react";
import { ApiResponse } from "../types";

const cache: Record<number, ApiResponse | null> = {};

export const useAllCharacters = (
  page?: number,
  filters?: { gender: string | null; status: string | null }
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (page === undefined) return;

      const genderFilter = filters?.gender ? `&gender=${filters.gender}` : "";
      const statusFilter = filters?.status ? `&status=${filters.status}` : "";
      const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}${genderFilter}${statusFilter}`;

      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const jsonData: ApiResponse = await res.json();

        cache[page] = jsonData; // Cache the results for this page
        setData(jsonData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Unknown error occurred");
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, filters]);

  return { loading, error, data };
};
