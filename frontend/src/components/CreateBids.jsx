import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const CreateBids = () => {
  const [bidAmount, setBidAmount] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.auth); 
  const userId = user?._id; 
  const { id: auctionId } = useParams();

  const handleCreateBid = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        `http://localhost:3000/api/v1/bid/place-bid/${userId}/${auctionId}`,
        { bidAmount },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form onSubmit={handleCreateBid}>
        <div>
          <div className="pb-2">
            <h1 className="text-2xl text-neutral-800 font-semibold">
              Place your bid on this auction
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 font-semibold" htmlFor="bidAmount">
              Enter Your Bid Amount
            </label>
            <input
              className="px-2 py-1 border border-neutral-400 block w-[20rem] rounded-md outline-none"
              type="tel"
              onChange={(e) => setBidAmount(e.target.value)}
              value={bidAmount}
              placeholder="Amount e.g.: 4000"
            />
          </div>
          <div className="py-3">
            <button
              disabled={loading} 
              className="px-4 font-semibold py-1 rounded-md bg-blue-400 text-neutral-700"
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 animate-spin text-2xl font-semibold text-neutral-800" />{" "}
                  Placing Your Bid
                </span>
              ) : (
                "Place Bid"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBids;
