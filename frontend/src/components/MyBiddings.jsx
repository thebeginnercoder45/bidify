import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const MyBiddings = () => {
  const [myBidds, setMyBidds] = useState([]);
  const { loading, user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const userId = user?._id;
  const dispatch = useDispatch();
  console.log(myBidds);
  

  useEffect(() => {
    const fetchMyBidds = async (userId) => {
      try {
        dispatch(setLoading(true));
        setError(null);
        const response = await axios.get(
          `http://localhost:3000/api/v1/bid/get-all-my-bidds/${userId}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          const uniqueBidds = response.data.bidds.reduce((acc, bid) => {
            if (bid.auctionItem && bid.auctionItem._id) {
              const existingBid = acc.find(
                (item) => item.auctionItem._id === bid.auctionItem._id
              );
              if (!existingBid || bid.bidAmount > existingBid.bidAmount) {
                acc = acc.filter(
                  (item) => item.auctionItem._id !== bid.auctionItem._id
                );
                acc.push(bid);
              }
            }
            return acc;
          }, []);

          setMyBidds(uniqueBidds);
        }
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "Failed to fetch bids.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (userId) {
      fetchMyBidds(userId);
    }
  }, [userId, dispatch]);

  const formatTimeDifference = (time) => {
    const auctionTime = new Date(time);
    const currentTime = new Date();
    const diffInMs = auctionTime - currentTime;

    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="text-2xl font-bold text-neutral-800 animate-spin" />
          <p className="text-lg font-bold text-neutral-800">
            Wait a while, fetching all your bids
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-bold text-neutral-800">{error}</p>
        </div>
      </div>
    );
  }

  if (myBidds.length === 0) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="flex items-center flex-col justify-center gap-2">
          <p className="text-lg font-bold text-neutral-800">
            You don't have any bids on auctions yet!
          </p>
          <Link to={"/auctions"}>
            <button className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200">
              Explore Auctions
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mt-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">
            My Most Higher Amount On Auction Bids
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
        {myBidds.map((myAuction) => (
          <Link
            key={myAuction.auctionItem._id}
            to={`/item-details/${myAuction.auctionItem._id}`}
          >
            <div className="border border-neutral-300 rounded-lg p-4">
              <div>
                <h1 className="bg-blue-200 w-fit mb-2 rounded-2xl flex items-center text-gray-700 text-sm px-2  font-semibold">
                  {myAuction.auctionItem.category}
                </h1>
                <img
                  className=" w-[18rem] h-[12rem] rounded-lg"
                  src={myAuction.auctionItem.itemImage}
                  alt={myAuction.auctionItem.name}
                />
              </div>
              <div className="py-2 pb-0">
                <h1 className=" text-neutral-800 py-2 font-semibold">
                  {myAuction.auctionItem.name.slice(0, 15)}...
                </h1>
                <div className="h-[3rem]">
                  <h2 className="text-neutral-600 text-sm font-semibold">
                    {myAuction.auctionItem.description.slice(0, 40)}...{" "}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm font-bold text-neutral-500">
                    Starting Time:
                  </p>
                  <p className="text-sm font-bold text-neutral-500">
                    {formatTimeDifference(myAuction.auctionItem.startTime)}
                  </p>
                </div>
                {myAuction.auctionItem.winner?._id === userId ? (
                  <div className="flex flex-col gap-2 py-2">
                    <p className="text-sm font-semibold text-green-500">
                      You won the this auction at price
                    </p>
                    <p className="text-xl font-bold text-green-500">
                      ₹ {myAuction.bidAmount}/-
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 py-2">
                    <p className="text-sm font-bold text-neutral-500">
                      Ongoing Price:
                    </p>
                    <p className="text-xl font-bold text-neutral-500">
                    ₹ {myAuction.auctionItem.currentPrice}/-
                    </p>
                  </div>
                )}
              </div>
              <div>
                {/* Check if the current user is the winner */}
                {myAuction.auctionItem.winner?._id === userId ? (
                  <button className="px-4 py-1 rounded-md border-2 border-green-600 bg-green-200 hover:bg-green-300">
                    Checkout
                  </button>
                ) : (
                  <button className="px-4 py-1 rounded-md bg-blue-200 hover:bg-blue-300">
                    Bidding ongoing
                  </button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MyBiddings;
