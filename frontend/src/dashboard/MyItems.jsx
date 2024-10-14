import React, { useEffect, useState } from "react";
import { setLoading } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const { loading, user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyItems = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/auction/get-my-items/${userId}`,
          {
            withCredentials: true,
          }
        );
        
        setItems(response.data.items);

      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Something went wrong");
        toast.error(error.response?.data?.message || "Error fetching items");
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (userId) {
      fetchMyItems();
    }
  }, [userId, dispatch]);

  function formatTimeDifference(time, type) {
    const now = new Date();
    const targetDate = new Date(time);
  
    const diffInMilliseconds = type === 'start' ? now - targetDate : targetDate - now;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    if (diffInDays === 0) return "Today";
  
    if (type === 'start') {
      return diffInDays > 0 ? `${diffInDays} days ago` : "Invalid date";
    } else if (type === 'end') {
      return diffInDays > 0 ? `${diffInDays} days left` : "Bidding Ended";
    }
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div>{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center gap-2">
            <Loader2 className=" text-2xl font-bold animate-spin" /> Getting
            your items, please wait...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-semibold text-neutral-800">
          My Auction Items
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-x-5 mt-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Link key={item._id} to={`/dashboard/manage-auction-items/${item._id}`}>
            <div className="border border-neutral-300 rounded-lg p-4">
              <div>
              <h1 className="bg-blue-200 w-fit mb-2 rounded-2xl flex items-center text-gray-700 text-sm px-2  font-semibold">
          {item.category}
        </h1>
                <img
                  className=" w-[18rem] h-[12rem] rounded-lg"
                  src={item.itemImage}
                  alt={item.name}
                />
              </div>
              <div className="py-2 pb-0">
                <h1 className=" text-neutral-800 py-2 font-semibold">
                  {item.name.slice(0, 15)}...
                </h1>
                <div className="h-[3rem]">
                  <h2 className="text-neutral-600 text-sm font-semibold">
                    {item.description.slice(0, 40)}...{" "}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm font-bold text-neutral-500">
                    Starting Time:
                  </p>
                  <p className="text-sm font-bold text-neutral-500">
                    {" "}
                    {formatTimeDifference(item.startTime,'start')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm font-bold text-neutral-500">
                    End Time:
                  </p>
                  <p className="text-sm font-bold text-neutral-500">
                    {" "}
                    {formatTimeDifference(item.endTime,'end')}

                  </p>
                </div>
                <div className="flex gap-2 py-4">
                  <p className="text-xl font-bold text-neutral-800">
                    Bidded Amount:
                  </p>
                  <p className="text-xl font-bold text-neutral-800">
                    Rs {item.currentPrice}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default MyItems;
