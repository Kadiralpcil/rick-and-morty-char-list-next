"use client";
// Components
import Card from "../Card";
import Loading from "../Loading";
import Avatar from "../Avatar";

// Types
import { Character } from "@/app/types";

// Icons
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface CustomTableProps {
  data?: Character[];
  totalCount: number;
  currentPage: number;
  onPageChange: (value: number) => void;
  search: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
  error?: string;
}

export const CustomTable = ({
  data,
  totalCount,
  currentPage,
  onPageChange,
  search,
  onSearchChange,
  loading,
  error,
}: CustomTableProps) => {
  const totalPages = Math.ceil(totalCount / 20);
  const maxPageButtons = 5;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded-md ${
            i === currentPage ? "bg-orange-500 text-white" : "bg-gray-900"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <Card className="mt-2 w-full h-[700px] sm:h-[500px] sm:w-[95%] md:mt-10 md:w-[80%] lg:w-[1024px] flex flex-col">
      <input
        className="w-[300px] mb-2 bg-gray-800 rounded-md outline-none px-4 py-2"
        placeholder="Search by name.."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex items-center justify-end text-white relative"></div>
      <div className="grid grid-cols-1 sm:grid-cols-5 bg-gray-800 p-2 text-white font-semibold sticky top-0 border-b border-gray-600 rounded-lg">
        <div className="text-left">Name</div>
        <div className="text-left">Status</div>
        <div className="text-left">Gender</div>
        <div className="text-left">Origin</div>
        <div className="text-left">Location</div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <div className="text-red-500">{error}</div> // Display the error message
          ) : (
            <>
              <div className="flex flex-col overflow-y-auto flex-grow custom-scrollbar overflow-x-hidden select-none">
                {data?.map((character) => (
                  <div
                    key={character.id}
                    className="grid grid-cols-1 sm:grid-cols-5 justify-between items-center p-2 text-white border-b border-gray-600 cursor-pointer transition duration-200 hover:bg-orange-600"
                  >
                    <div>
                      <Avatar name={character.name} image={character.image} />
                    </div>
                    <div>{character.status}</div>
                    <div>{character.gender}</div>
                    <div>{character.origin.name}</div>
                    <div>{character.location.name}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center p-4 text-white space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="bg-orange-500 p-2 rounded-md disabled:opacity-50"
                >
                  <MdKeyboardDoubleArrowLeft size={18} />
                </button>
                {renderPageButtons()}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="bg-orange-500 p-2 rounded-md disabled:opacity-50"
                >
                  <MdOutlineKeyboardDoubleArrowRight size={18} />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Card>
  );
};
