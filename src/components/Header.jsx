import React from "react";
import Logo from "./logo";
import { CgSearch } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-sm bg-white">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
          />
          <div className="text-lg w-[3.13rem] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <CgSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div>
            <FaRegCircleUser size={22} cursor="pointer" />
          </div>

          <div className="relative ">
            <span>
              <BsCart3 size={22} cursor="pointer" />
            </span>

            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>

          <div>
            <Link to={"login"} className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 outline-none">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
