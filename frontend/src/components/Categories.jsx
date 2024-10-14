import axios from "axios";
import React, { useState } from "react";
import {X} from 'lucide-react'

export const categories = [
  "Art",
  "Jewellery",
  "Asian antiques",
  "Furniture",
  "Coins",
  "Home & Decor",
  "Collectibles",
  "Vintage",
  "Electronics",
  "Books",
  "Laptops",
  "Mobiles",
  "Cloths"
];

const Categories = ({auctionItems,setAuctionItems}) => {

const [selectedCategory,setSelectedCategory] = useState("")
  const handleCategoryClick = async (e) => {
    setSelectedCategory(e.target.id);
    console.log(e.target.id);
    const category = e.target.id;
    try {
      const response = await axios.get("http://localhost:3000/api/v1/auction/get-single-items", {
        params: { category }
      });
      console.log('Fetched items:', response.data);
      setAuctionItems(response.data.auctionItems)

    } catch (error) {
      setAuctionItems([]);
      console.error('Error fetching auction items:', error);
    }
  };

  const handleClose = async()=>{
    setSelectedCategory("");
    const response = await axios.get(
      "http://localhost:3000/api/v1/auction/get-all-items",
      {
        withCredentials: true,
      }
    );
    setAuctionItems(response.data.auctionItems);
  }

  return (
    <nav className=" py-4 " aria-label="Product categories">
      <div className="max-w-7xl mx-auto">
      <ul className="flex items-start gap-7 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <li key={category} className="flex-shrink-0">
              <button
                
                className={`text-sm px-3 py-1.5 rounded-full flex gap-x-2 justify-center items-center ${
                  selectedCategory === category ? "bg-blue-300 text-white" : "bg-neutral-200 text-gray-600"
                } hover:text-black focus:text-black whitespace-nowrap`}
              >
                <div id={category} onClick={(e) => handleCategoryClick(e)}>{category}</div>
               { selectedCategory === category && <X  className="w-4 h-4 hover:text-red-500" onClick={handleClose}/>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Categories;