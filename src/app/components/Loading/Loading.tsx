import Image from "next/image";

export const Loading = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <Image
        className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-lg"
        src="/loading.gif"
        width={100}
        height={100}
        alt="loading"
      />
      <div className="absolute bg-[#00000080] text-white bottom-2 w-full text-center text-[16px] font-extrabold md:text-[24px]">
        LOADING..
      </div>
    </div>
  );
};
