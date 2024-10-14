import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateBids from "../components/CreateBids.jsx";

const ItemDet = () => {
  const [item, setItem] = useState(null);
  const [bidding, setBidding] = useState([]);
  const [error, setError] = useState(null);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: itemId } = useParams();

  useEffect(() => {
    const fetchItemById = async () => {
      try {
        dispatch(setLoading(true));
        setError(null);

        const response = await axios.get(
          `http://localhost:3000/api/v1/auction/get-item-details/${itemId}`
        );
        setItem(response.data.item);
      } catch (error) {
        setError(error?.response?.data?.message || "Something went wrong.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (itemId) {
      fetchItemById();
    }
  }, [itemId, dispatch]);

  useEffect(() => {
    const fetchBid = async () => {
      try {
        dispatch(setLoading(true));
        setError(null);

        const response = await axios.get(
          `http://localhost:3000/api/v1/bid/get-bids/${itemId}`,{
            withCredentials:true,
          }
        );
        console.log(response.data)
        setBidding(response.data.itemDetails.bids)
      } catch (error) {
        setError(error?.response?.data?.message || "Something went wrong.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (itemId) {
      fetchBid();
    }
  }, [itemId, dispatch]);
  

  function formatTimeToDays(startTime) {
    const now = new Date();
    const startDate = new Date(startTime);

    const diffInMilliseconds = now - startDate;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 0) return "Bidding Ended";
    return `${diffInDays} days ago`;
  }

  return (
    <section className="f">
      <div className=" max-w-7xl mx-auto md:px-0 px-3 mt-12 border border-neutral-400 p-10 rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : item ? (
          <div className="flex items-start justify-between gap-20">
            <div className="w-1/2">
              <div>
                <img
                  className="w-[40rem] h-[30rem]"
                  src={item.itemImage}
                  alt={item.name}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">
                  {item.name}.
                </h1>
                <p className="text-neutral-600 py-1 ">
                  {item.description.slice(0, 250)}
                </p>
                <p className="text-xl py-4 pb-2 font-semibold text-neutral-600">
                  Bidding Starts: {formatTimeToDays(item.startTime)}
                </p>
                <p className="text-xl font-semibold text-neutral-600">
                  Bidding Ends: {formatTimeToDays(item.endTime)}
                </p>
                <p className="text-xl py-4 pb-2 font-semibold text-neutral-600">
                  Bidding Current Price:{" "}
                  <span className="text-3xl font-bold text-neutral-800">
                    Rs {item.currentPrice}{" "}
                  </span>
                </p>
                <h1 className="flex gap-x-2 text-xl py-4 pb-2 font-semibold text-neutral-600">Bidding till now : 
                  {bidding.length !== 0 ? <span className="flex flex-col">{bidding.map((bid,i)=> <span className="text-base">[ {bid.user.email} - ₹ {bid.bidAmount}]</span>)}</span> : <span>No one bidded yet</span>}
                
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <p>No item found</p>
        )}
      </div>
      {/* <CreateBids /> */}
    </section>
  );
};

export default ItemDet;
