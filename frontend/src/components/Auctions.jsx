import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAuctionItems = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          "http://localhost:3000/api/v1/auction/get-all-items",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setAuctions(response.data.auctionItems);
        }
      } catch (error) {
        console.log(error);
        
        const errorMessage =
          error.response?.data?.message || "Failed to fetch auction items.";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAllAuctionItems();
  }, [dispatch]);

  function formatTimeDifference(time, type) {
    const now = new Date();
    const targetDate = new Date(time);

    const diffInMilliseconds =
      type === "start" ? now - targetDate : targetDate - now;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";

    if (type === "start") {
      return diffInDays > 0 ? `${diffInDays} days ago` : "Invalid date";
    } else if (type === "end") {
      return diffInDays > 0 ? `${diffInDays} days left` : "Bidding Ended";
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mt-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">
            Explore auction
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
        {auctions.length > 0 ? (
          auctions
            .filter((item) => {
              const currentTime = new Date().getTime(); // Current time in milliseconds
              const endingTime = new Date(item.endTime).getTime(); // Parse ISO date string
              return endingTime > currentTime; // Only show items where the auction is still open
            })
            .map((item) => (
              <Link key={item._id} to={`/item-details/${item._id}`}>
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
                        {formatTimeDifference(item.startTime, "start")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-sm font-bold text-neutral-500">
                        End Time:
                      </p>
                      <p className="text-sm font-bold text-neutral-500">
                        {" "}
                        {formatTimeDifference(item.endTime, "end")}
                      </p>
                    </div>
                    <div className="flex gap-2 py-4">
                      <p className="text-xl font-bold text-neutral-800">
                        Starting Price:
                      </p>
                      <p className="text-xl font-bold text-neutral-800">
                        Rs {item.currentPrice}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="px-4 py-1 rounded-md bg-blue-200 hover:bg-blue-300">
                      Place bid
                    </button>
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </section>
  );
};

export default Auctions;
