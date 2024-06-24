import { FaGithub } from "react-icons/fa";

import BackButton from "../BackButton";
import { IoHome } from "react-icons/io5";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="bg-[#3177b3] w-full p-2 flex items-center justify-between px-5">
      <BackButton />
      <Link href="/" key="Home">
        <IoHome color="white" className="cursor-pointer" />
      </Link>
      <FaGithub cursor="pointer" color="white" size={22} />
    </div>
  );
};

export default TopBar;
