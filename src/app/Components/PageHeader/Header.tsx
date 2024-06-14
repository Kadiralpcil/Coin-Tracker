import { Button, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";
interface HeaderProps {
  name: string;
  icon: ReactNode;
  path: string;
}
const Header = ({ name, icon, path }: HeaderProps) => {
  return (
    <Link href={path}>
      <Button
        className="flex items-center gap-2 px-2 !outline-none !border-none "
        variant="ghost"
      >
        <div>{icon}</div>
        <h1 className="text-[1.5rem]">{name}</h1>
      </Button>
    </Link>
  );
};

export default Header;
