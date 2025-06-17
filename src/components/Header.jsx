import React from "react";
import Logo from "./logo";
import { CgSearch } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../service";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { LogOut } from "lucide-react";
import { useState } from "react";
import ROLE from "../service/role";
import logo from "../assest/logo.svg";
import { useContext } from "react";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e)=>{
    const { value } = e.target

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className="h-16 shadow-sm bg-white fixed w-full z-40">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div>
          <Link to={"/"} aria-label="logo">
            <img src={logo} alt="logo" width={140} height={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
          />
          <div className="text-lg w-[3.13rem] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <CgSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    className="w-8 h-8 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser size={22} cursor="pointer" />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden md:block">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"cart"} className="relative ">
              <span>
                <BsCart3 size={22} cursor="pointer" />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.countCartItems}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <LogOut
                size={22}
                cursor="pointer"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              />
            ) : (
              // <button onClick={handleLogout} className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 outline-none cursor-pointer">Logout</button>
              <Link
                to={"login"}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 outline-none cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
