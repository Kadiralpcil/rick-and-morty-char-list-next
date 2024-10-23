import { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode | string;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`filter drop-shadow-md border border-gray-950 rounded-lg bg-gray-950 text-white p-6 ${
        className ?? ""
      } 
      md:p-4 sm:p-2`}
    >
      {children}
    </div>
  );
};
