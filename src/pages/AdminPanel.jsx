import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="min-h-[calc(100vh-120px)] hidden md:flex">
      <aside className="bg-white min-h-full w-full max-w-60 shadow-customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="relative flex justify-center">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser size={32} cursor="pointer" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* navigation */}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All product
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
