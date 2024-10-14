import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../components/Categories";

const CreateItems = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const userId = user._id;
  // console.log(categories);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", description);
    formData.append("startTime", startTime);
    formData.append("endTime", endDate);
    formData.append("currentPrice", currentPrice);
    formData.append("category", category);
    if (image) {
      formData.append("itemImage", image);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/auction/create-auction-item/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setItemName("");
        setDescription("");
        setStartTime("");
        setEndDate("");
        setCurrentPrice("");
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Auction Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-8">
          <div className="w-1/2 flex flex-col gap-3">
            <div>
              <label
                htmlFor="itemName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="currentPrice"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Price
              </label>
              <input
                type="text"
                id="currentPrice"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md p-2 bg-neutral-50"
              />
            </div>

            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Auction Start Date
              </label>
              <input
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Auction End Date
              </label>
              <input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-3">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md p-2"
                rows="4"
              />
            </div>
            <div>
              <label htmlFor="category">Select items category:</label>

              <select
                id="category"
                onChange={(e) => (setCategory(e.target.value))}
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Item Image
              </label>
              <input
                type="file"
                name="itemImage"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end p-10">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Create Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItems;
