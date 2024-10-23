import { ApiResponse } from "@/app/types";

export type CharactersResponse = ApiResponse | { error: string };

export const getAllCharacters = async (
  page = 1,
  filters: { gender?: string; status?: string } = {},
  name = ""
): Promise<CharactersResponse> => {
  const genderFilter = filters.gender ? `&gender=${filters.gender}` : "";
  const statusFilter = filters.status ? `&status=${filters.status}` : "";
  const nameFilter = name ? `&name=${name}` : "";
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}${genderFilter}${statusFilter}${nameFilter}`;

  const res = await fetch(apiUrl);
  if (!res.ok) {
    return { error: `There is nothing here` };
  }

  return (await res.json()) as ApiResponse;
};
