import Image from "next/image";

interface AvatarProps {
  name: string;
  image: string;
}
export const Avatar = ({ name, image }: AvatarProps) => {
  return (
    <div className="flex  items-center gap-2">
      <Image
        className="rounded-full"
        src={image}
        alt="name"
        width={50}
        height={50}
      />
      <div>{name}</div>
    </div>
  );
};
