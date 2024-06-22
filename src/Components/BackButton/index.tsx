"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <IoMdArrowBack cursor="pointer" color="white" size={22} />
    </div>
  );
};
export default BackButton;
