import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";

const NavBar = ({}) => {
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-[60px]">
      <Logo />

      <div className="flex gap-3">
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default NavBar;
