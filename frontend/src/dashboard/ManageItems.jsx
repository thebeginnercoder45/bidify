import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManageItems = () => {
  const [item, setItem] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { id: itemId } = useParams();
  const navigate = useNavigate();
  console.log(item);

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
        console.log(error);

        setError(error?.response?.data?.message || "Something went wrong.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (itemId) {
      fetchItemById();
    }
  }, [itemId, dispatch]);

  const handleDeleteItem = async (itemId) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(
        `http://localhost:3000/api/v1/auction/delete-auction-item/${itemId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate("/dashboard/my-auction-items");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-4 border-2 flex flex-col items-center justify-center border-neutral-500 rounded-lg bg-neutral-100">
            <h1 className="text-2xl font-bold text-neutral-800">
              Toatal Biddings
            </h1>
            <p className="text-2xl font-bold text-neutral-700">
              {/* {item.biddings.length} */}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className=" p-10">
          <div className=" flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-700">
              Item Details
            </h1>
            <div className=" flex items-center justify-center gap-4">
              <div>
                <button className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200">
                  Edit Item
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="text-neutral-800 font-semibold px-4 py-1 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-all duration-200"
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-lg font-semibold text-neutral-600">
              Item Name
            </h1>
            <p className=" text-neutral-600 font-semibold">{item.name}</p>
          </div>
          <div className="mt-2">
            <h1 className="text-lg font-semibold text-neutral-600">
              Item Description
            </h1>
            <p className=" text-neutral-600 font-semibold">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
