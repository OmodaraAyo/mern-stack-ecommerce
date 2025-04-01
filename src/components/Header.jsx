import React from "react";
import Logo from "./logo";
import { CgSearch } from "react-icons/cg";

const Header = () => {
  return (
    <header className="h-16 shadow-sm">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div>
          <Logo w={90} h={50} />
        </div>



        <div className="flex items-center w-full justify-between max-w-sm">
          <input type="text" placeholder="search product here..." />
          <div className="text-lg w-[3.13rem] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <CgSearch />
          </div>
        </div>



        <div>user icon and card</div>
      </div>
    </header>
  );
};

export default Header;
