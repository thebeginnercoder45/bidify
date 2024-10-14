import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateBids from "../CreateBids";
import toast from "react-hot-toast";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [winner, setWinner] = useState(null); // To store winner details
  const [hasDeclaredWinner, setHasDeclaredWinner] = useState(false); // Flag to prevent multiple declarations
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
        calculateTimeLeft(response.data.item.endTime);
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

  const declareWinner = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/auction/declare-winner`,
        { itemId }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setWinner(response.data.winner);
      }
      console.log("Winner declared:", response.data.winner);
    } catch (error) {
      console.error("Error declaring winner:", error);
    }
  };

  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const endDate = new Date(endTime);
    const timeDiff = endDate - now;

    if (timeDiff <= 0) {
      setTimeLeft("Bidding Ended");
      if (!hasDeclaredWinner) {
        declareWinner();
        setHasDeclaredWinner(true);
      }
    } else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
  };

  useEffect(() => {
    let timer;
    if (item?.endTime) {
      timer = setInterval(() => {
        calculateTimeLeft(item.endTime);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [item?.endTime]);

  return (
    <section>
      <div className="max-w-7xl mx-auto md:px-0 px-3 mt-12 border border-neutral-400 p-10 rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : item ? (
          <div className="flex items-start justify-between gap-20">
            <div className="w-1/2">
              <img
                className="w-[40rem] h-[30rem]"
                src={item.itemImage}
                alt={item.name}
              />
            </div>
            <div className="w-1/2">
              <h1 className="text-2xl font-bold text-neutral-800">
                {item.name}
              </h1>
              <p className="text-neutral-600 py-1">
                {item.description.slice(0, 250)}
              </p>
              <p className="text-xl py-4 pb-2 font-semibold text-neutral-600">
                Bidding Ends in: {timeLeft}
              </p>
              <p className="text-xl font-semibold text-neutral-600">
                Current Price:{" "}
                <span className="text-3xl font-bold text-neutral-800">
                  Rs {item.currentPrice}
                </span>
              </p>

              {timeLeft === "Bidding Ended" ? (
                winner ? (
                  <div className="mt-4">
                    <p className="text-lg font-bold text-green-600">
                      Winner Declared!
                    </p>
                    <p className="text-lg text-neutral-600">
                      Winner: {winner.fullName}
                    </p>
                    <p className="text-lg text-neutral-600">
                      Email: {winner.email}
                    </p>
                    <p className="text-lg text-neutral-600">
                      Winning Amount: Rs {item.currentPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg text-yellow-600 mt-4">
                    Winner will be declared soon...
                  </p>
                )
              ) : null}
            </div>
          </div>
        ) : (
          <p>No item found</p>
        )}
      </div>
      <CreateBids />
    </section>
  );
};

export default ItemDetails;
