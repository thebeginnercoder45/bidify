import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { setUser, setLoading } from "../redux/authSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const seller = user?.isSeller;

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setUser(null));
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      if (error.response && error.response.status === 401) {
        dispatch(setUser(null));
        toast.error("Session expired. Please log in again.");
        navigate("/sign-in");
      } else {
        toast.error("Failed to logout. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link to={"/"}>
              <h1 className="text-3xl text-slate-700 font-normal">
                <span className="font-bold text-black">Bid</span>ify
              </h1>
            </Link>
            <div className="ml-8">
              <ul className="flex items-center justify-center gap-7">
                <Link to={"/my-biddings"}>
                  <li className="text-sm font-medium text-neutral-600 hover:text-neutral-800">
                    My biddings
                  </li>
                </Link>
                <Link to={"/auctions"}>
                  <li className="text-sm font-medium text-neutral-600 hover:text-neutral-800">
                    Explore Auctions
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            {seller ? (
              <div>
                <Link to={"/dashboard"}>
                  <button className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200">
                    Dashboard
                  </button>
                </Link>
              </div>
            ) : (
              <span>
                {user === null ? (
                  ""
                ) : (
                  <Link to="/register-seller">
                    <button className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200">
                      Become a seller
                    </button>
                  </Link>
                )}
              </span>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="border border-neutral-700 bg-neutral-50 w-9 h-9 rounded-full flex items-center justify-center">
                  <h1 className="text-xl font-semibold">
                    {user.name ? user.name[0] : "U"}
                  </h1>
                </div>
                <button
                  className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/sign-in">
                  <button className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200">
                    Log in
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
