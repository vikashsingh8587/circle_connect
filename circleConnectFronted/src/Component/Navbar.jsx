import React, { useState } from "react";
import LogIn from "../Pages/Login/Login";
import {
  Search,
  Bell,
  MessageSquare,
  User,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/Slice/UserSlice";
import SignUp from "../Pages/SignUp/SignUp";
import { Navigate, useNavigate } from "react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp,setShowSignUp]=useState(false);

 
  const user = useSelector((state) => state.user);


  const logged = !!user?.email;


  const handleLogout = () => {
    dispatch(logout());
  };

  console.log(showLogin);
  console.log("Navbar user =", user);
console.log("logged =", logged);

  
  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 w-full z-50 border-b border-gray-200 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Left */}
            <div className="flex items-center gap-2">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <a
                href="#"
                className="flex items-center gap-2 text-2xl font-bold text-indigo-600"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-lg">
                  C
                </div>
                <span className="hidden md:block">Circle Connect</span>
              </a>
            </div>

            {/* Middle */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search friends, circles..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {!logged ? (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="hidden md:block px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-full transition"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => setShowSignUp(true)}
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 shadow-md transition transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full text-gray-600 relative">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>

                  <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <MessageSquare className="w-6 h-6" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition focus:outline-none ring-2 ring-transparent focus:ring-indigo-200"
                    >
                      <img
                        alt="User"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                    </button>

                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsDropdownOpen(false)}
                        ></div>

                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                          
                          <div className="px-4 py-2 border-b border-gray-100 mb-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {user?.username}
                            </p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>

                          <a onClick={()=> navigate("/dashboard")}
                           className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <User className="w-4 h-4" /> My Profile
                          </a>

                          <a className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Users className="w-4 h-4" /> My Circles
                          </a>

                          <a className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Settings className="w-4 h-4" /> Settings
                          </a>

                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <LogOut className="w-4 h-4" /> Logout
                            </button>
                          </div>

                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Popup Login */}
      {showLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <LogIn />
            </div>
          </div>
        </div>
      )}
      {showSignUp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <SignUp/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
